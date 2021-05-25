import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Heading, Card, CardBody, Button } from 'yogi-uikit_rc';
import { useWallet } from 'use-wallet';
import useI18n from 'hooks/useI18n';
import { useAllHarvest } from 'hooks/useHarvest';
import useFarmsWithBalance from 'hooks/useFarmsWithBalance';
import UnlockButton from 'components/UnlockButton';
import YogiHarvestBalance from './YogiHarvestBalance';
import YogiWalletBalance from './YogiWalletBalance';

const StyledFarmStakingCard = styled(Card)`
  background-image: url('https://raw.githubusercontent.com/yogi-fi/yogi-assets/master/character/defi.png');
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: 95% 90%;
  min-height: 376px;
`;

const Block = styled.div`
  margin-bottom: 16px;
`;

const TokenImageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const CardImage = styled.img`
  margin-right: 8px;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`;

const Actions = styled.div`
  margin-top: 24px;
`;

const FarmedStakingCard: React.FC = () => {
  const [pendingTx, setPendingTx] = useState(false);
  const { account, ethereum } = useWallet();
  const TranslateString = useI18n();
  const farmsWithBalance = useFarmsWithBalance();
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0);

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid));

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true);
    try {
      await onReward();
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false);
    }
  }, [onReward]);

  const addWatchYogiToken = useCallback(async () => {
    const provider = ethereum;
    if (provider) {
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await provider.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: '0x88888C8783a88aD40d995073Ab7FBbe8d34aCdA8',
              symbol: 'YOGI',
              decimals: '18',
              image: 'https://raw.githubusercontent.com/yogi-fi/yogi-assets/master/token/token512.png',
            },
          },
        });

        if (wasAdded) {
          console.log('Token was added');
        }
      } catch (error) {
        // TODO: find a way to handle when the user rejects transaction or it fails
      }
    }
  }, []);

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(542, 'Farms & Staking')}
        </Heading>
        <TokenImageWrapper>
          <CardImage src="https://raw.githubusercontent.com/yogi-fi/yogi-assets/master/token/token256.png" alt="yogi token" width={64} height={64} />
          <Button onClick={addWatchYogiToken} scale="sm">
            <span>+</span>
            <img style={{ marginLeft: 8 }} width={24} src="https://raw.githubusercontent.com/yogi-fi/yogi-assets/master/connectors/metamask.png" alt="metamask logo" />
          </Button>
        </TokenImageWrapper>
        <Block>
          <YogiHarvestBalance />
          <Label>{TranslateString(544, 'YOGI to Harvest')}</Label>
        </Block>
        <Block>
          <YogiWalletBalance />
          <Label>{TranslateString(546, 'YOGI in Wallet')}</Label>
        </Block>
        <Actions>
          {account ? (
            <Button id="harvest-all" disabled={balancesWithValue.length <= 0 || pendingTx} onClick={harvestAllFarms}>
              {pendingTx ? TranslateString(548, 'Collecting YOGI') : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton fullWidth />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  );
};

export default FarmedStakingCard;

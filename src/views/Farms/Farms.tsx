import React, { useEffect } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useWallet } from 'use-wallet';
import { Heading } from 'yogi-uikit_rc';
import FlexLayout from 'components/layout/Flex';
import Page from 'components/layout/Page';
import { useFarms } from 'state/hooks';
import useRefresh from 'hooks/useRefresh';
import { fetchFarmUserDataAsync } from 'state/actions';
import useI18n from 'hooks/useI18n';
import FarmCard from './components/FarmCard/FarmCard';
import FarmTabButtons from './components/FarmTabButtons';
import Divider from './components/Divider';

const Farms: React.FC = () => {
  const { path } = useRouteMatch();
  const TranslateString = useI18n();
  const farms = useFarms();
  const { account, ethereum } = useWallet();

  const dispatch = useDispatch();
  const { fastRefresh } = useRefresh();
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account));
    }
  }, [account, dispatch, fastRefresh]);

  return (
    <Page>
      <Heading as="h1" size="lg" color="text" mb="50px" style={{ textAlign: 'center' }}>
        {TranslateString(320, 'Stake LP tokens to earn YOGI')}
      </Heading>
      <FarmTabButtons />
      <div>
        <Divider />
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farms.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} ethereum={ethereum} account={account} />
            ))}
          </Route>
        </FlexLayout>
      </div>
    </Page>
  );
};

export default Farms;

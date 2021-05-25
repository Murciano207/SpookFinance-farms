import { useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { useDispatch } from 'react-redux';
import { fetchFarmUserDataAsync } from 'state/actions';
import { harvest } from 'utils/callHelpers';
import { useMasterYogi } from './useContract';

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch();
  const { account } = useWallet();
  const masterYogiContract = useMasterYogi();

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterYogiContract, farmPid, account);
    dispatch(fetchFarmUserDataAsync(account));
    return txHash;
  }, [account, dispatch, farmPid, masterYogiContract]);

  return { onReward: handleHarvest };
};

export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWallet();
  const masterYogiContract = useMasterYogi();

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterYogiContract, pid, account)];
    }, []);

    return Promise.all(harvestPromises);
  }, [account, farmPids, masterYogiContract]);

  return { onReward: handleHarvest };
};

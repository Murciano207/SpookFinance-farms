import { useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { useDispatch } from 'react-redux';
import { fetchFarmUserDataAsync } from 'state/actions';
import { stake } from 'utils/callHelpers';
import { useMasterYogi } from './useContract';

const useStake = (pid: number) => {
  const dispatch = useDispatch();
  const { account } = useWallet();
  const masterYogiContract = useMasterYogi();

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterYogiContract, pid, amount, account);
      dispatch(fetchFarmUserDataAsync(account));
      console.info(txHash);
    },
    [account, dispatch, masterYogiContract, pid],
  );

  return { onStake: handleStake };
};

export default useStake;

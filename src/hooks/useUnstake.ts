import { useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { useDispatch } from 'react-redux';
import { fetchFarmUserDataAsync } from 'state/actions';
import { unstake } from 'utils/callHelpers';
import { useMasterYogi } from './useContract';

const useUnstake = (pid: number) => {
  const dispatch = useDispatch();
  const { account } = useWallet();
  const masterYogiContract = useMasterYogi();

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterYogiContract, pid, amount, account);
      dispatch(fetchFarmUserDataAsync(account));
      console.info(txHash);
    },
    [account, dispatch, masterYogiContract, pid],
  );

  return { onUnstake: handleUnstake };
};

export default useUnstake;

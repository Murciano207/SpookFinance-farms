import { useCallback } from 'react';
import { useWallet } from 'use-wallet';
import { Contract } from 'web3-eth-contract';
import { useDispatch } from 'react-redux';
import { fetchFarmUserDataAsync } from 'state/actions';
import { approve } from 'utils/callHelpers';
import { useMasterYogi } from './useContract';

// Approve a Farm
export const useApprove = (lpContract: Contract) => {
  const dispatch = useDispatch();
  const { account }: { account: string } = useWallet();
  const masterYogiContract = useMasterYogi();

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterYogiContract, account);
      dispatch(fetchFarmUserDataAsync(account));
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, dispatch, lpContract, masterYogiContract]);

  return { onApprove: handleApprove };
};

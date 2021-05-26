import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';

export const approve = async (lpContract, masterYogiContract, account) => {
  return lpContract.methods.approve(masterYogiContract.options.address, ethers.constants.MaxUint256).send({ from: account });
};

export const stake = async (masterYogiContract, pid, amount, account) => {
  return masterYogiContract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash;
    });
};

export const unstake = async (masterYogiContract, pid, amount, account) => {
  return masterYogiContract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash;
    });
};

export const harvest = async (masterYogiContract, pid, account) => {
  return masterYogiContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash;
    });
};

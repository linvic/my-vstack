// import Web3 from 'web3';
// import { AbiItem } from 'web3-utils';
import lockerABI from "../ABI/uniCrypt.json";
import { Contract } from "@ethersproject/contracts";
import { Address } from '@/constants';
import { ethers } from '@usedapp/core/node_modules/ethers';
import ERCAbi from '../ABI/IERC.json'
import IPinksale from '../ABI/IPinksale.json'
import PancakeAbi from '../ABI/IPancakeRouterV2.json'
// const getContract = (abi: any, address: string, web3?: Web3) => {
//     return new web3.eth.Contract(abi as unknown as AbiItem, address);
// }

export const lockInterface = new ethers.utils.Interface(lockerABI);
export const getLockerContract = (address: string) => {
  const contract = new Contract(address, lockInterface);
  return contract;
}
const ERCInterface = new ethers.utils.Interface(ERCAbi);

const PinkInterface = new ethers.utils.Interface(IPinksale);
export const getERCContract = (tokenAddress: string) => {
  return new Contract(tokenAddress, ERCInterface);
}
export const getCPContract = () => {
  return getERCContract(Address.CP);
}

export const getPinkPresaleContract = (contractAddress: string) => {
  console.log("getPinkPresaleContract", contractAddress);
  return new Contract(contractAddress, PinkInterface);
}
const routerInterface = new ethers.utils.Interface(PancakeAbi);
export const getPancakeRouterV2Contract = () => {
  return new Contract(Address.PANCAKE_ROUTER, routerInterface);
}
/* swapExactETHForTokensSupportingFeeOnTransferTokens(outMin, path, to, deadline)
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOutMin",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "path",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
*/

/*
const methodCall = contract.methods.swapExactETHForTokens(
    '0',
    [Symbols.wbnb, token],
    this.account.address,
    this.deadline(),//
);

sell
      const methodCall = contract.methods.swapExactTokensForETHSupportingFeeOnTransferTokens(
          amount,
          '0',
          [token, Symbols.wbnb],
          this.account.address,
          this.deadline(),
      );
*/
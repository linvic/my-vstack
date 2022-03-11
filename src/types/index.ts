import {  BigNumber, Contract, ethers,utils } from "ethers";


export interface LockItem {
    lockDate: BigNumber;
    amount: BigNumber;
    initialAmount: BigNumber;
    unlockDate: BigNumber;
    lockID: BigNumber;
    owner: string;
    tokenAddress: string;
}
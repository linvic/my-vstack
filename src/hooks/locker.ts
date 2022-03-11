import { Address } from "@/constants";
import { LockItem } from "@/types";
import { getLockerContract } from "@/utils/contractHelpers";
import { useContractCall, useContractFunction } from "@usedapp/core";
import { BigNumber, ethers } from "ethers";
import uniCryptAbi from "../ABI/uniCrypt.json";


const lockerInterface = new ethers.utils.Interface(uniCryptAbi);


export function useLockerTokenLocks(token: string, index: number, locker: string = Address.LOCKER): LockItem {
  const res: any = useContractCall(token && {
    abi: lockerInterface,
    address: locker,
    method: "tokenLocks",
    args: [token, index],
  }) ?? [];

  const lockItem: LockItem = {
    lockDate: res[0],
    amount: res[1],
    initialAmount: res[2],
    unlockDate: res[3],
    lockID: res[4],
    owner: res[5],
    tokenAddress: token,
  }
  return lockItem;
}


export function useLockerGetNumLockedTokens(locker: string = Address.LOCKER): BigNumber {
  const res: any = useContractCall({
    abi: lockerInterface,
    address: locker,
    method: "getNumLockedTokens",
    args: []
  }) ?? [];
  return res[0];
}
export function useLockerGetNumLockedForToken(token: string, locker: string = Address.LOCKER): BigNumber {
  const res: any = useContractCall(token && {
    abi: lockerInterface,
    address: locker,
    method: "getNumLocksForToken",
    args: [token]
  }) ?? [];
  return res[0];
}

// 锁定
export function useLockerLockLPToken(locker: string = Address.LOCKER) {
  const contract = getLockerContract(locker);
  const { state, send, events } = useContractFunction(contract, "lockLPToken");
  return { state, send, events };
}

// 取出
export function useLockerWithdraw(locker: string = Address.LOCKER) {
  const contract = getLockerContract(locker);
  return useContractFunction(contract, "withdraw");
}


export function useLockerGetLockedTokenAt(index: number, locker: string = Address.LOCKER): string {
  const res: any = useContractCall({
    abi: lockerInterface,
    address: locker,
    method: "getLockedTokenAtIndex",
    args: [index]
  }) ?? [];
  // console.log(`getLockedToken = ${res[0]}`);
  return res[0];
}


// 用户相关查询
export function useLockerGetUserNumLockedTokens(userAddr: string, locker: string = Address.LOCKER): BigNumber {
  const res: any = useContractCall(userAddr && {
    abi: lockerInterface,
    address: locker,
    method: "getUserNumLockedTokens",
    args: [userAddr]
  }) ?? [];
  console.log(`GetUserNumLockedTokens num = ${res[0]}`);
  return res[0];
}

export function useLockerGetUserLockedTokenAtIndex(userAddr: string, index: number, locker: string = Address.LOCKER): string {
  const res = useContractCall(userAddr && {
    abi: lockerInterface,
    address: locker,
    method: "getUserLockedTokenAtIndex",
    args: [userAddr, index]
  }) ?? [];
  console.log(`GetUserLockedTokenAtIndex  = ${res}`);
  return res[0];
}


export function useLockerGetUserNumLocksForToken(userAddr: string,
  token: string, locker: string = Address.LOCKER): BigNumber {
  const [res]: any = useContractCall(userAddr && token && {
    abi: lockerInterface,
    address: locker,
    method: "getUserNumLocksForToken",
    args: [userAddr, token],
  }) ?? [];
  return res;
}

export function useLockerGetUserLockForTokenAtIndex(userAddr: string,
  token: string, index: number, locker: string = Address.LOCKER): LockItem {
  const res: any = useContractCall(userAddr && token && index !== undefined && {
    abi: lockerInterface,
    address: locker,
    method: "getUserLockForTokenAtIndex",
    args: [userAddr, token, index],
  }) ?? [];

  return res ? {
    lockDate: res[0],
    amount: res[1],
    initialAmount: res[2],
    unlockDate: res[3],
    lockID: res[4],
    owner: res[5],
    tokenAddress: token,
  } : null;
}


import { Address } from "@/constants";
import { LockItem } from "@/types";
import { getLockerContract } from "@/utils/contractHelpers";
import { ContractCall, Token, useContractCall, useContractCalls, useContractFunction, useToken } from "@usedapp/core";
import { TokenInfo } from "@usedapp/core/dist/esm/src/model/TokenInfo";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { BigNumber, ethers } from "ethers";
import pairABI from "../ABI/IPancakePair.json";


const pairInterface = new ethers.utils.Interface(pairABI);

export interface LPToken01 {
  token0: string;
  token1: string;
}
export interface LPTokenInfo extends TokenInfo, LPToken01 { }

export function useLPToken(tokenAddress: string | Falsy): LPTokenInfo | undefined {
  const partialCall = {
    abi: pairInterface,
    address: tokenAddress || '',
    args: [],
  }
  const args = ['name', 'symbol', 'decimals', 'totalSupply', 'token0', 'token1'].map((method): ContractCall => ({ ...partialCall, method }))
  const [name, symbol, decimals, totalSupply, token0, token1] = useContractCalls(args)

  if (!name && !symbol && !decimals && !totalSupply && !token0 && !token1) {
    return undefined
  }

  return {
    name: name?.[0] ?? '',
    symbol: symbol?.[0] ?? '',
    decimals: decimals?.[0],
    totalSupply: totalSupply?.[0],
    token0: token0?.[0] ?? '',
    token1: token1?.[0] ?? '',
  }
}


export function useLPToken01(tokenAddress: string | Falsy): LPToken01 | undefined {
  const partialCall = {
    abi: pairInterface,
    address: tokenAddress || '',
    args: [],
  }
  const args = ['token0', 'token1'].map((method): ContractCall => ({ ...partialCall, method }))
  const [token0, token1] = useContractCalls(args)

  if (!token0 && !token1) {
    return undefined
  }

  return {
    token0: token0?.[0].toLowerCase() ?? '',
    token1: token1?.[0].toLowerCase() ?? '',
  }
}
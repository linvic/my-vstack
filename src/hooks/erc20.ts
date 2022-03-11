import { Address } from "@/constants";
import { getCPContract, getERCContract } from "@/utils/contractHelpers";
import { TransactionOptions, useContractCall, useContractFunction, useEthers, useTokenAllowance } from "@usedapp/core";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { ethers } from "@usedapp/core/node_modules/ethers";
import { BigNumber } from "ethers";
import ERCAbi from '../ABI/IERC.json'



export function useCPApprove() {
  return useContractFunction(getCPContract(), "approve");
}
export function useERCApprove(tokenAddress: string, opt?: TransactionOptions) {
  return useContractFunction(getERCContract(tokenAddress), "approve", opt);
}
// export function useERCSymbol() {
//   const contract = getCPContract();
//   const { state, send, events } = useContractFunction(contract, "symbol");
//   return { state, send, eve·nts };
// }

const ERC20Interface = new ethers.utils.Interface(ERCAbi);

export function useCPLPApprove() {
  const contract = getERCContract(Address.CP_LP); // 都是erc标准
  const { state, send, events } = useContractFunction(contract, "approve");
  return { state, send, events };
}

export function useTokenSymbol(tokenAddress: string | Falsy): string | undefined {
  const [symbol] = useContractCall(tokenAddress && {
    abi: ERC20Interface,
    address: tokenAddress || '',
    args: [] as any,
    method: 'symbol',
  }) ?? [];
  if (!symbol) return undefined;

  return symbol;
}
export function useTokenDecimals(tokenAddress: string | Falsy): string | undefined {
  const [decimals] = useContractCall(tokenAddress && {
    abi: ERC20Interface,
    address: tokenAddress || '',
    args: [] as any,
    method: 'decimals',
  }) ?? [];
  if (!decimals) return undefined;

  return decimals;
}

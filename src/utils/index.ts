import { pow } from "@/constants";
import { ethers } from "@usedapp/core/node_modules/ethers";


// 生成 [start, end] 的整形数组
function getRangeArray(start: number, end: number) {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}
export function getRangeArr(len: number) {
  return getRangeArray(0, len - 1);
}


export function isDebug(): boolean {
  return true;
}

export const isCN = (i: any) => {
  return i.language === "zh";
}

export const getSwapDeadline = () => Math.round(new Date().getTime() / 1000) + 30;

const bigValue = pow(10);
export function bigNumberToStr(b: ethers.BigNumber, decimals: number = 18, toFixed: number = 3) {
  if (!b) return "";
  if (b.div(pow(decimals)).gt(bigValue)) {
    return b.toString();
  } else {
    return (b.mul(pow(5)).div(pow(decimals)).toNumber() / 100000).toFixed(toFixed);
  }
}

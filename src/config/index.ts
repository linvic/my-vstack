import { pow } from "@/constants";
import { ethers } from "ethers";

// gasPrice 指 一个gas的价格
// gasLimit 指限制 gas的数量，必须 >= 21000 gas unit
// 预售 5Gwei limit 为 326,592
// 这里按照两倍来估算， 设置为两倍, 60 0000;
export const gasLimit = ethers.BigNumber.from(6).mul(pow(5));

export const txInfoExistTime = 20;

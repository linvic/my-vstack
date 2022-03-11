import { Address, pow } from "@/constants";
import { ethers } from "@usedapp/core/node_modules/ethers";
import bnbLogo from '../static/token-logo/bnb.png';
import usdtLogo from '../static/token-logo/bsc-usd-logo.png';

interface TokenInfo2 {
  tokenAddress: string;
  logoUrl: string;
  symbol: string;
}
const standardTokens: Map<string, TokenInfo2> = new Map();
standardTokens.set(Address.WBNB, { tokenAddress: Address.WBNB, logoUrl: bnbLogo, symbol: "WBNB" });
standardTokens.set(Address.USDT, { tokenAddress: Address.USDT, logoUrl: usdtLogo, symbol: "USDT" });

export function getAnotherToken(token0: string, token1: string) {
  token0 = token0.toLowerCase();
  token1 = token1.toLowerCase();
  // console.log(`token0 ${token0}  token1 ${token1}`);
  // console.log(`wbnb ${Address.WBNB} usdt ${Address.USDT}`);
  if (standardTokens.get(token0)) {
    return { token: token1, standardToken: standardTokens.get(token0) };
  } else if (standardTokens.get(token1)) {
    return { token: token0, standardToken: standardTokens.get(token1) };
  }
  return { token: token0, standardToken: undefined };
  // return token0 === Address.WBNB ? token1 : token0;
}

export function getTokenImgUrl(token: string) {
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${token}/logo.png`;
}

export function isLPToken(symbol: string) {
  return symbol === 'Cake-LP';
}

export function shortcutAddress(address: string) {
  // 0x1dd7cB9b4eB7eF0E5D98d6c4885e803787d56A95
  if (!address || address.length < 10) return address;
  let l = address.length;
  return `${address.substring(0, 4)}...${address.substring(l - 4, l)}`;
}
export function isAddress(s: string) {
  return ethers.utils.isAddress(s);
  // if (s) {
  //   s = s.toLowerCase();
  //   return /0x[0-9a-f]/.test(s);
  // }
  // return false;
}

export function getTxLink(txHash: string) { return `https://bscscan.com/tx/${txHash}`; };

export function getGWei(n: number = 5.1): ethers.BigNumber {
  // 0.000000005 BNB (5 Gwei) = 5*10**9 wei
  return ethers.BigNumber.from(Math.round(n * 100)).mul(pow(9)).div(100);
}
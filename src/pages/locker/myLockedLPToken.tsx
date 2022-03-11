import React from "react";
import { ItemInner, ItemRowComp } from './lockList';
import { useLockerGetUserLockForTokenAtIndex, useLockerGetUserNumLocksForToken } from "@/hooks/locker";
import { useToken } from "@usedapp/core";
import { TokenInfo } from "@usedapp/core/dist/esm/src/model/TokenInfo";



// 用户对 token 锁定次数
const MyLockToken: React.FC<{ account: string, token: string }> = (props) => {
  const nums = useLockerGetUserNumLocksForToken(props.account, props.token);
  const tokenInfo = useToken(props.token);

  const getMyTokenRows = () => {
    if (!nums || nums.eq(0) || !tokenInfo || !tokenInfo.symbol) {
      return null;
    } else {
      const arr = Array.from({ length: nums.toNumber() }).map((item, index) => index);
      return arr.map(i => <MyLockTokenRow
        tokenInfo={tokenInfo}
        account={props.account}
        token={props.token}
        index={i}
        key={i}
      />)
    }
  }
  return <>
    {getMyTokenRows()}
    <ItemInner token={props.token}></ItemInner>
  </>
}
const MyLockTokenRow: React.FC<{ tokenInfo: TokenInfo, account: string, token: string, index: number }> = (props) => {
  const lockItem = useLockerGetUserLockForTokenAtIndex(props.account, props.token, props.index);
  if (!lockItem || !lockItem.amount || !props.tokenInfo) return null;
  return <ItemRowComp token={props.token} tokenInfo={props.tokenInfo} lockItem={lockItem} index={props.index} />
}




export default MyLockToken;
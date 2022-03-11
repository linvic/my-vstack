import React, { useEffect, useState } from "react";
import { useEthers, useToken, useTokenBalance } from "@usedapp/core";
import { useLockerGetLockedTokenAt, useLockerGetNumLockedForToken, useLockerGetNumLockedTokens, useLockerGetUserNumLockedTokens, useLockerTokenLocks, useLockerWithdraw } from '@/hooks/locker';
import { Image, Form, Input, Button, Row, Col, Popover } from "antd";
import { LPToken01, LPTokenInfo, useLPToken, useLPToken01 } from "@/hooks/pair";
import { Address } from "@/constants";
import { ethers } from "ethers";
import bnbLogo from '../../static/token-logo/bnb.png';
import cpLogo from '../../static/token-logo/cp.jpeg';
import { useTranslation } from "react-i18next";
import { LockItem } from "@/types";
import { TokenInfo } from "@usedapp/core/dist/esm/src/model/TokenInfo";
import { getAnotherToken, getTokenImgUrl, isLPToken } from "@/utils/token";
import { getRangeArr } from "@/utils";


const MainLockList: React.FC = () => {
  const lockNum = useLockerGetNumLockedTokens();
  if (!lockNum || lockNum.eq(0)) return null;

  // 展示 [lockNum - showNum, lockNum] 最新的10个
  const _lockNum = lockNum.toNumber();
  let showNum = _lockNum > 10 ? 10 : _lockNum;
  showNum = _lockNum;
  const showIndex = [];
  for (let i = _lockNum - showNum; i < _lockNum; i++) {
    showIndex.push(i);
  }

  return (
    <div className="lock-list-wrap">
      <TableTitle />
      {showIndex.map(i => <Item key={i} index={i} />)}
    </div>
  )
}

const Item: React.FC<{ index: number }> = (props) => {
  const token = useLockerGetLockedTokenAt((props.index != undefined) && props.index) ?? undefined;
  if (!token) return null;
  return <ItemInner token={token} />;
}

export const ItemInner: React.FC<{ token: string }> = (props) => {
  const token = props.token;
  const tokenInfo = useToken(token && token) ?? undefined;
  const numOfToken = useLockerGetNumLockedForToken(token && token) ?? undefined;

  if (!tokenInfo || !tokenInfo.totalSupply || !numOfToken || numOfToken.eq(0)) return null;

  // console.log(`${Date.now() / 1000} getNumLocksForToken = ${numOfToken}`);

  const arr = getRangeArr(numOfToken.toNumber());
  return <>
    {arr.map(i => <ItemRow key={i + "in"} token={token} tokenInfo={tokenInfo} index={i} />)}
  </>
}

export const TableTitle: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="d-f jc-sa" style={{ marginBottom: 5 }}>
      <span className="lock-item">{t('name')}</span>
      <span className="lock-item">{t('lockedAmount')}</span>
      <span className="lock-item">{t('unlockedTime')}</span>
      <span className="lock-item">{t('operation')}</span>
    </div>
  )
}

const ItemRow: React.FC<{ token: string, tokenInfo: TokenInfo, index: number }> = (props) => {
  const lockItem = useLockerTokenLocks(props.token, props.index);
  if (!lockItem || !lockItem.amount || lockItem.amount.eq(0)) return null;
  return <ItemRowComp token={props.token} tokenInfo={props.tokenInfo} lockItem={lockItem} />
}
export const ItemRowComp: React.FC<{ token: string, tokenInfo: TokenInfo, lockItem: LockItem, index?: number }> = (props) => {
  const lpToken01 = isLPToken(props.tokenInfo.symbol) ? useLPToken01(props.token) : undefined;

  // const msg = lpToken01 ? `LP-Token: ${props.token}\n token: ${getAnotherToken(lpToken01.token0, lpToken01.token1).token}` : `token: ${props.token}`
  return <div className="d-f jc-sa ai-c">
    <TokenCol token={props.token} tokenInfo={props.tokenInfo} lpToken01={lpToken01} />
    <LockCols token={props.token} lockItem={props.lockItem} tokenInfo={props.tokenInfo} index={props.index} />
  </div>
}

const TokenCol: React.FC<{ token: string, tokenInfo: TokenInfo, lpToken01?: LPToken01 }> = (props) => {
  if (props.lpToken01) {
    return <LPTokenCol tokenInfo={props.tokenInfo} lpToken01={props.lpToken01} />
  }
  if (isLPToken(props.tokenInfo.symbol)) return <div></div>;

  const realToken = props.token.toLowerCase();
  let imgUrl = getTokenImgUrl(realToken);
  if (realToken === Address.CP) {
    imgUrl = cpLogo;
  }

  return <TokenImg token={props.token} name={props.tokenInfo.symbol} imgUrl={imgUrl} fallback={bnbLogo} />;
}
const LPTokenCol: React.FC<{ tokenInfo: TokenInfo, lpToken01: LPToken01 }> = (props) => {
  const { token: realToken, standardToken } = getAnotherToken(props.lpToken01.token0, props.lpToken01.token1);
  const info = useToken(realToken);
  if (!info || !info.symbol) {
    return <div></div>;
  }
  const name = `${standardToken && standardToken.symbol}/${info.symbol}`;
  let imgUrl = getTokenImgUrl(realToken);
  if (realToken.toLowerCase() === Address.CP) {
    imgUrl = cpLogo;
  }
  return <TokenImg token={realToken} name={name} imgUrl={imgUrl} fallback={standardToken && standardToken.logoUrl} />
}
const TokenImg: React.FC<{ token: string, name: string, imgUrl: string, fallback: string }> = (props) => {
  return <span className="lock-item d-f jc-c ai-c"><Image
    alt={props.name}
    width={20}
    height={20}
    src={props.imgUrl}
    fallback={props.fallback}
  /><span style={{ marginLeft: '5px' }}><Popover content={props.token}>{props.name}</Popover> </span></span>
}

const LockCols: React.FC<{ token: string, tokenInfo: TokenInfo, lockItem: LockItem, index?: number }> = (props) => {
  const { t, i18n } = useTranslation();
  const lockItem = props.lockItem;
  function getUnlockDate() {
    const unlockDate = lockItem.unlockDate?.toNumber();
    const now = Date.now() / 1000;
    const unlockAfter = now > unlockDate ? t('unlocked') :
      `${Math.floor((unlockDate - now) / (24 * 3600))} ${t('daysLeft')}`;
    return unlockAfter;
  }
  /* Total Locked（总锁定价值）， 同市值
  */
  if (!lockItem.amount) return null;
  const _percent = (lockItem.amount.mul(10000000).div(props.tokenInfo.totalSupply).toNumber() / 100000).toFixed(3);
  const lockPercent = `${lockItem.amount.div(
    ethers.BigNumber.from(10).pow(props.tokenInfo.decimals)
  )}(${_percent}%)`;

  return (
    <>
      {/* <span className="lock-item">$7,565,024.8</span> */}
      <span className="lock-item">{lockPercent}</span>
      {/* <span className="lock-item">$0.2000</span> */}
      <span className="lock-item">{getUnlockDate()}</span>
      <WithdrawCol token={props.token} lockItem={lockItem} index={props.index} />
      {/* <span className="lock-item" onClick={e => { }}>{t('withdraw')}</span> */}
      {/* <span className="lock-item">  
        <Button type="primary">View</Button>
        <Button type="primary">View</Button>
        <Button type="primary">View</Button>
      </span> */}
    </>)
}

const WithdrawCol: React.FC<{ token: string, lockItem: LockItem, index?: number }> = (props) => {
  const { account } = useEthers();
  const { send, state, events } = useLockerWithdraw();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (state.status === 'Success') {
      const url = `https://bscscan.com/tx/${state.transaction.hash}`;
      alert(`${t('msgWithdrawSuccess')} 👉 ${url}`);
    } else if (state.errorMessage === "execution reverted: NOT YET") {
      alert(t("tooEarly"));
    }
  }, [state]);
  // const [form] = Form.useForm();
  // 判断下 locker总持仓，提取量不应该大于这个
  const balance = useTokenBalance(props.lockItem.tokenAddress, Address.LOCKER);


  function withdraw(lockItem: LockItem, index: number) {
    if (account !== lockItem.owner) {
      alert(t('youAreNotOwner'))
      return;
    }
    if (props.lockItem.amount.eq(0)) {
      alert('已经被提取了')
      return;
    }
    // let { unlockAmount } = form.getFieldsValue(true);
    // console.log("unLockAmount", unlockAmount, typeof unlockAmount);
    // lpToken, index, lockID, amount
    const unlockDate = props.lockItem.unlockDate.toNumber();
    if (unlockDate > Date.now() / 1000) {
      alert(t("tooEarly"));
      return;
    }
    console.log(`${lockItem.lockID} index=${props.index} ${lockItem.amount.toString()} `)
    console.log(`real balance = ${balance}`)
    // lpToken, index, lockId, amount
    const realUnlockAmount = lockItem.amount.gt(balance) ? balance : lockItem.amount;
    // return;
    send(props.token, index, lockItem.lockID, realUnlockAmount).then(() => {
      console.log(`withdraw state = ${JSON.stringify(state)}`);
      // {"status":"Exception","errorMessage":"execution reverted: NOT YET","chainId":56}
      if (state.errorMessage === "execution reverted: NOT YET") {
        alert(t("tooEarly"));
      }
      // alert("提取成功");
    }).catch(e => {
      alert(`withdraw err=${e}`);
    });
  }

  if (props.index !== undefined) {
    const owner = '';// = `(0x${props.lockItem.owner.substring(2, 4)}...${props.lockItem.owner.substring(38, 42)})`
    const showOwner = props.lockItem.owner.toLowerCase() === account.toLowerCase();
    const show = showOwner ? `${t('withdraw')}${owner}` : "-";
    return < span className="lock-item" >
      <Button onClick={e => { withdraw(props.lockItem, props.index) }} type="primary">{show}</Button>
    </span >
    // https://ant.design/components/form/
    // return <span className="lock-item">
    //   <Form
    //     // name="lockForm"
    //     form={form}
    //     // labelCol={{ span: 1 }}
    //     // wrapperCol={{ span: 8 }}
    //     onFinish={e => withdraw(props.lockItem, props.index)}
    //     initialValues={{
    //       unlockAmount: 100,
    //     }}
    //   >
    //     <Form.Item name='unlockAmount'
    //       style={{ display: 'inline-block', width: 'calc(25% - 8px)', margin: '0 0px' }}
    //     >
    //       <Input ></Input>
    //     </Form.Item>
    //     <label style={{ display: 'inline-block', backgroundColor: "white" }}  >%</label>
    //     <Button
    //       style={{ display: 'inline-block', margin: '0 2px' }}
    //       onClick={e => form.submit()}>
    //       Withdraw
    //     </Button>
    //   </Form>
    // </span>
  } else {
    return <span className="lock-item">-</span>
  }
}
export default MainLockList;
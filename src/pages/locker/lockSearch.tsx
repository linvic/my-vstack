import { Address, ETHFee, UNLIMITED } from "@/constants";
import { useCPApprove, useERCApprove, useTokenSymbol } from "@/hooks/ERC20";
import { useLPToken01 } from "@/hooks/pair";
import { getLockerContract } from "@/utils/contractHelpers";
import { Token, useSendTransaction, useToken, useTokenAllowance, useTokenBalance } from "@usedapp/core";
import { TokenInfo } from "@usedapp/core/dist/esm/src/model/TokenInfo";
import { Form, Button, DatePicker, Input, Select, FormInstance, Popover } from "antd";
import { BigNumber, ethers } from "ethers";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LockContext from './lockContext';
import moment from 'moment';
import { getAnotherToken, isLPToken } from "@/utils/token";
import { isCN } from "@/utils";


function getLockButton(onClick: any) {
  return <Button className="lock-btn" onClick={e => { onClick() }}>Lock</Button>
}

const Locker: React.FC = () => {
  const { dispatch, state } = useContext(LockContext);
  const { token } = state;
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();

  function search(tokenAddress: string) {
    const valid = ethers.utils.isAddress(tokenAddress);
    if (!valid) { // 这个地方还不能确定token的有效性
      console.log(`address ${tokenAddress} invalid`)
      alert(t('msgInputCorrectAddress'));
      dispatch({
        type: 'update_state',
        data: {
          token: ''
        }
      })
      return;
    }
    dispatch({
      type: 'update_state',
      data: {
        token: tokenAddress
      }
    })
  }
  console.log(`searchToken = ${token}`);

  // const getInstruction = () => <p>{t('lockerInstructionsDetail')}</p>;
  const getInstruction = () =>
    isCN(i18n) ? <>
      <p>1. 对0税率代币完美支持,比如 Cake-LP; </p>
      <p>2. 对含有税率的代币进行锁定，可能会损失转账手续费, 需要发币方介入才能完全支持;</p>
      <p>3. 锁币和提币都需先搜索才能操作</p>
    </> : <>
      <p>1. Perfect support for zero-tax tokens such as Cake-LP; </p>
      <p>2. Locking token with tax may lose the transfer fee, which need project party support;</p>
      <p>3. Please perform locking or withdrawing after search.</p>
    </>

  return (<div className="d-f"
    style={{ alignItems: 'center', flex: 1, justifyContent: 'center', marginBottom: 35 }}>
    <div style={{
      background: '#FFF',
      borderRadius: '12px',
      padding: '20px',
      width: '650px',
      textAlign: 'center'
    }}>
      <p style={{ fontSize: 20, fontWeight: 'bolder' }}>
        <span>
          {t('CPLocker')}{" "}
        </span>
        <span>
          <Popover
            content={getInstruction()}>
            <span style={{ fontSize: 14, color: "#ff0000" }} >
              {t('lockerInstructions')}
            </span>
          </Popover>
        </span>
      </p>

      {token ? <CheckToken token={token} /> : <Form name="searchForm"
        form={form}
        wrapperCol={{ span: 16 }}
        onFinish={val => { val.searchText && search(val.searchText); }}>
        <Form.Item name="searchText" style={{ justifyContent: 'center' }}>
          <Input placeholder={t('msgSearchToken')} style={{ borderRadius: '10px' }} />
        </Form.Item>
        <Button className="lock-btn" htmlType="submit">
          {t('searchLPToken')}
        </Button>
      </Form>}
    </div>
  </div>);
}

// 做一层检测优化
const CheckToken: React.FC<{ token: string }> = (props) => {
  const symbol = useTokenSymbol(props.token);
  if (!symbol) return null;

  // const locker = symbol === 'Cake-LP' ? Address.LOCKER : Address.LOCKER2;
  // dispatch({
  //   type: 'update_state',
  //   data: {
  //     locker: locker,
  //   }
  // })
  return <CheckTokenInfo token={props.token} />;
}

const CheckTokenInfo: React.FC<{ token: string }> = (props) => {
  const tokenInfo = useToken(props.token);
  if (!props.token || !tokenInfo || !tokenInfo.symbol) return null;
  return <ShowTokenLockCondition tokenInfo={tokenInfo} token={props.token} />
}

const ShowTokenLockCondition: React.FC<{ tokenInfo: TokenInfo, token: string }> = (props) => {
  const { dispatch, state } = useContext(LockContext);
  const { t, i18n } = useTranslation();
  const token = props.token;
  const { account, locker } = state;
  let balance = useTokenBalance(token, account);
  const [form] = Form.useForm();
  const { send: CPApprove, state: approveCPStatus } = useCPApprove();
  const { send: TokenApprove, state: tokenApproveState } = useERCApprove(token);
  const tokenAllowance = useTokenAllowance(token, account, locker);
  const CPAllowance = useTokenAllowance(Address.CP, account, locker);
  const { sendTransaction, state: sendState } = useSendTransaction({ transactionName: "lockLPToken" })
  const tokenInfo = props.tokenInfo;

  useEffect(() => {
    console.log(`approveCPStatus = ${JSON.stringify(approveCPStatus)} ${approveCPStatus.status}`)
    if (approveCPStatus.status == "Success") {
      alert(`CP: ${t('msgApproveSuccess')}`);
    }
  }, [approveCPStatus]);

  useEffect(() => {
    console.log(`tokenApproveState = ${JSON.stringify(tokenApproveState)} ${tokenApproveState.status}`)
    if (approveCPStatus.status == "Success") {
      alert(`${tokenInfo.symbol}: ${t('msgApproveSuccess')}`);
    }
  }, [tokenApproveState]);

  useEffect(() => {
    if (sendState.status === 'Success') {
      const url = `https://bscscan.com/tx/${sendState.transaction.hash}`;
      alert(`${t('msgLockSuccess')} 👉 ${url}`);
    }
    // console.log(`sendState = ${JSON.stringify(sendState)}`);
  }, [sendState]);

  if (!tokenInfo || !balance) return null;

  const isLP = isLPToken(tokenInfo.symbol);

  const { Option } = Select;

  // balance = balance.div(ethers.BigNumber.from(10).pow(tokenInfo.decimals));
  const percent = balance.mul(1000000).div(tokenInfo.totalSupply).toNumber() / 10000;

  const show_balance = showBalance(balance, tokenInfo.decimals);
  return (<div>
    {isLP ? <LPTokenSymbol lpToken={props.token} tokenInfo={tokenInfo} /> :
      <TokenSymbol tokenInfo={tokenInfo} />}
    <Form
      name="lockForm"
      form={form}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 12 }}
      onFinish={e => lock({
        token, account, form, locker, CPApprove, TokenApprove,
        sendTransaction, t, CPAllowance, tokenAllowance,
        tokenInfo, balance
      })}
      initialValues={{
        feeInETHVal: 'feeInCP',
        lockAmount: show_balance,
      }}
    >
      <Form.Item label={t('feeMode')} name="feeInETHVal">
        <Select style={{ borderRadius: 10, textAlign: 'left' }}>
          <Option value="feeInETH">{t('feeInETH')}</Option>
          <Option value="feeInCP">{t('feeInCP')}</Option>
        </Select>
      </Form.Item>
      <Form.Item label={t('unlockedTime')} name="unlockDate">
        <DatePicker
          showTime
          disabledDate={current => {
            return current &&
              current <= moment().subtract(1, 'days').endOf('day');
          }}
          style={{ width: '100%', borderRadius: 10 }}></DatePicker>
      </Form.Item>
      <Form.Item label={t('holdingAmount')} style={{ textAlign: 'left' }}>
        <span>{show_balance}({percent}%)</span>
      </Form.Item>
      <Form.Item label={t('lockAmount')} name='lockAmount'>
        <Input style={{ borderRadius: 10 }}></Input>
      </Form.Item>
      {balance.gt(0) ? getLockButton(() => { form.submit() }) :
        getLockButton(() => { alert(t("msgYouDontHaveThisToken")) })}
    </Form>
  </div>
  )
}
function showBalance(balance: BigNumber, decimals: number): string {
  const denominator = ethers.BigNumber.from(10).pow(decimals);
  if (balance.gt(denominator.mul(10000))) {
    return balance.div(denominator).toString();
  } else {
    return `${balance.mul(100000).div(denominator).toNumber() / 100000}`;
  }
}
interface Params {
  token: string,
  account: string,
  form: FormInstance,
  locker: string,
  CPApprove: any,
  TokenApprove: any,
  sendTransaction: any,
  t: any,
  CPAllowance: BigNumber,
  tokenAllowance: BigNumber,
  tokenInfo: TokenInfo,
  balance: BigNumber
}

function lock(params: Params) {
  const { token, account, form, locker, CPApprove, TokenApprove,
    sendTransaction, t, CPAllowance, tokenAllowance,
    tokenInfo, balance } = params;

  let { lockAmount, unlockDate, feeInETHVal } = form.getFieldsValue(true);
  // lockAmount = ethers.utils.parseEther(String(lockAmount));// 单位转换
  console.log(`lockAmount = ${lockAmount}`);
  console.log(`tokenInfo = ${JSON.stringify(tokenInfo)}`);
  // const decimals = ethers.BigNumber.from(tokenInfo.decimals);
  const tmp = Math.round(Number(lockAmount) * 100000);
  console.log(`tmp = ${tmp}`);
  // ethers.BigNumber.from("0.001")形式会下溢出报错,需要额外处理下
  let realLockAmount: BigNumber = ethers.BigNumber.from(tmp).mul(
    ethers.BigNumber.from(10).pow(tokenInfo.decimals)
  ).div(100000);
  console.log(`${realLockAmount.toString()} realLockAmount`);
  console.log(`${balance.toString()} balance`);

  if (realLockAmount.lte(0) || realLockAmount.gt(balance)) {
    console.log(`too big ${realLockAmount.toString()}`);
    alert(t('somethingWrong'));
    return;
  }
  //假如锁定cp，需要留足手续费
  if (token === Address.CP) {
    const CPFee = ethers.BigNumber.from(1000000).mul(
      ethers.BigNumber.from(10).pow(tokenInfo.decimals)
    );
    if (realLockAmount.gte(balance.sub(CPFee))) {
      realLockAmount = realLockAmount.sub(CPFee);
    }
  }

  unlockDate = Math.round(Date.parse(unlockDate) / 1000); // 秒级时间戳
  // 参数校验？哪个地方合适？
  if (unlockDate <= Date.now() / 1000) {
    // alert("时间错误");
    alert(t('somethingWrong'));
    return;
  }

  const feeInETH = feeInETHVal === 'feeInETH';
  if (!feeInETH && CPAllowance.lte(ethers.BigNumber.from("100000"))) { // 判断授权额度是否足够, 手续费
    console.log(`CP allowance not enough, approve first.`)
    CPApprove(locker, UNLIMITED).then();
    return;
  }
  if (tokenAllowance.lte(ethers.BigNumber.from("1"))) {
    TokenApprove(locker, UNLIMITED);
    return;
  }

  const referal = Address.ZERO; // 推荐人，暂不开启
  getLockerContract(locker).populateTransaction.lockLPToken(
    token, realLockAmount, unlockDate, referal, feeInETH, account
  ).then(tx => {
    tx.from = account;
    if (feeInETH) {
      tx.value = ETHFee;
    } else {
      tx.value = ethers.BigNumber.from(0);
    }
    sendTransaction(tx);
  });
}

const LPTokenSymbol: React.FC<{ lpToken: string, tokenInfo: TokenInfo }> = (props) => {
  const lpToken01 = useLPToken01(props.lpToken);
  const res = getAnotherToken(lpToken01.token0, lpToken01.token1);
  const anotherToken = lpToken01 ? res.token : '';
  const anotherTokenSymbol = useTokenSymbol(anotherToken);
  if (!anotherTokenSymbol) return null;
  return <div style={{ fontWeight: 'bolder', fontSize: 16, marginBottom: 15 }}>
    {props.tokenInfo.symbol}({res.standardToken.symbol}/{anotherTokenSymbol})
  </div>
}
const TokenSymbol: React.FC<{ tokenInfo: TokenInfo }> = (props) => {
  return <div style={{ fontWeight: 'bolder', fontSize: 16, marginBottom: 15 }}>
    {props.tokenInfo.symbol}({props.tokenInfo.name})
  </div>
}
export default Locker;
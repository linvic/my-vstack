# repo

git clone ssh://194.76.146.34:/home/xiao/vstack


```
建立裸仓库
git init --bare vstack
关联
git push -u ssh://xiao@194.76.146.34:/home/xiao/vstack

随便设置点编辑人信息
git config user.name "test"
git config user.email "test@he.com"

```

# usedapp

https://usedapp.readthedocs.io/en/latest/core.html#usecontractcall

## useToken

https://usedapp.readthedocs.io/en/latest/core.html#usetoken

```
const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f'
const daiInfo = useToken(DAI_ADDRESS)

return daiInfo ? (
  <>
    <p>Dai name: {daiInfo?.name}</p>
    <p>Dai symbol: {daiInfo?.symbol}</p>
    <p>Dai decimals: {daiInfo?.decimals}</p>
    <p>Dai totalSupply: {daiInfo?.totalSupply ? formatUnits(daiInfo?.totalSupply, daiInfo?.decimals) : ''}</p>
  </>
) : null
```

# ehters.js

https://usedapp.readthedocs.io/en/latest/core.html#usecontractcall

# call/send 的区别

```
https://stackoverflow.com/questions/66432758/execution-reverted-when-calling-a-method-of-my-contract-in-nodejs

Also, call() is used for reading the output of pure/view functions. For interacting with external/public functions (sending ethereum transactions), use .send({from: <senderAddress>}).
```

# ethers

## 1 Write Methods Analysis

```
https://docs.ethers.io/v5/api/contract/contract/
```

## sendState

1. 刚发送: state.status = "Mining"

```
span
```

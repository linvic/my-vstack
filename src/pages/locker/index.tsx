import React, { useEffect, useReducer } from "react";
import LockSearch from './lockSearch';
import MainLockList, { TableTitle } from './lockList';
import MyLockedLPToken from "./myLockedLPToken";
import LockContext from './lockContext';
import { reducer, initState } from './reducer';
import { useEthers } from "@usedapp/core";
import { Address } from "@/constants";

const Locker: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { token } = state;
  const { account } = useEthers();
  useEffect(() => {
    dispatch({
      type: 'update_state',
      data: {
        account: account,
        locker: Address.LOCKER,
      }
    })
  }, [account]);
  return (
    <LockContext.Provider value={{ dispatch, state }}>
      <div className="d-f jc-sb" style={{ flexDirection: 'column', width: '100%' }}>
        <LockSearch />
        {!token && <div id="lockList">
          <MainLockList />
        </div>}
        {!!token && <div className="lock-list-wrap hei123">
          <TableTitle />
          <MyLockedLPToken account={account} token={token} />
        </div>}
      </div>
    </LockContext.Provider>
  )

}

export default Locker;
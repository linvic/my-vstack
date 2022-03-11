import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../static/logo.jpeg';
import { Button, Tag, Tooltip } from 'antd';
// import { TwitterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useEthers, useEtherBalance } from "@usedapp/core";
import { Path, Website } from '@/constants/url';
import { isCN } from '@/utils';
import Clock from './clock';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const { activateBrowserWallet, deactivate, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  function handleDeactivateAccount() {
    deactivate();
  }

  return (
    <div className="d-f jc-sb">
      <div className="d-f">
        <div className="d-f ai-c mr-12 c-p pc-only" onClick={() => {
          window.open(Website.website, '_blank')
        }}>
          <img src={logo} className="logo" />
          <span>COWBOY</span>
        </div>
        <div className="d-f">
          {/* <Link to={Path.swap} className={pathname == '/swap' ? 'active mr-12' : 'normal mr-12'}>{t('swap')}</Link> */}
          <Link to={Path.locker} className={pathname == '/locker' ? 'active mr-12' : 'normal mr-12'}>{t('locker')}</Link>
          {/* <Link to={Path.buy} className={pathname == '/buy' ? 'active mr-12' : 'normal mr-12'}>{t('menuBuy')}</Link> */}
          {/* <Link to={Path.todo}className={pathname == '/todo' ? 'active' : 'normal'}>{t('earn')}</Link> */}
          {/* <Link to={Path.tools} className={pathname == '/tools' ? 'active mr-12' : 'normal mr-12'}>{t('tools')}</Link> */}
        </div>
      </div>
      <div className="d-f ai-c">
        <Tag className="c-p mr-12" style={{ borderRadius: '100px' }}
        ><Clock /></Tag>
        <Tag className="c-p mr-12" style={{ borderRadius: '100px' }} onClick={() => {
          i18n.changeLanguage(i18n.language == 'en' ? 'zh' : 'en');
        }}>{isCN(i18n) ? '简体中文' : 'ENGLISH'}</Tag>

        {account ? <Tooltip style={{ borderRadius: '100px' }} title={<a onClick={handleDeactivateAccount}>{t('disConnect')}</a>} color="white">
          <Tag style={{ borderRadius: '100px' }}  >{account.slice(0, 6)}...{account.slice(account.length - 4, account.length)}</Tag>
        </Tooltip> : <Button style={{ borderRadius: '100px' }} size="small" onClick={handleConnectWallet}>{t('connect')}</Button>}

      </div>
    </div>
  )
}

export default Header;
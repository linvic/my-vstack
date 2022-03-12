import React, { useState } from 'react';
import { Button } from 'antd'
import { MenuFoldOutlined, UpCircleOutlined, HomeOutlined, GlobalOutlined, GiftOutlined, FundProjectionScreenOutlined } from '@ant-design/icons'
import styles from './index.module.less'

const menuList = [
  {
    name: 'Home',
    router: '',
    icon: <HomeOutlined />,
    isActive: true
  },
  {
    name: 'Menu 2',
    router: '',
    icon: <GlobalOutlined />
  },
  {
    name: 'Menu 3',
    router: '',
    icon: <GiftOutlined />
  },
  {
    name: 'Menu 4',
    router: '',
    icon: <FundProjectionScreenOutlined />
  },
  {
    name: 'Menu 2',
    router: '',
    icon: <GlobalOutlined />
  },
  {
    name: 'Menu 3',
    router: '',
    icon: <GiftOutlined />
  },
  {
    name: 'Menu 4',
    router: '',
    icon: <FundProjectionScreenOutlined />
  },
  {
    name: 'Menu 2',
    router: '',
    icon: <GlobalOutlined />
  },
  {
    name: 'Menu 3',
    router: '',
    icon: <GiftOutlined />
  },
  {
    name: 'Menu 4',
    router: '',
    icon: <FundProjectionScreenOutlined />
  },
  {
    name: 'Menu 2',
    router: '',
    icon: <GlobalOutlined />
  },
  {
    name: 'Menu 3',
    router: '',
    icon: <GiftOutlined />
  },
  {
    name: 'Menu 4',
    router: '',
    icon: <FundProjectionScreenOutlined />
  }
];

const Footer: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  return <>
    <aside className={`${styles.sider} ${!collapsed ? styles.show : styles.hide }`}>
      <div className={styles.siderHeader}>
        <div className={styles.siderHeaderLogo}>
          vstack
        </div>
        <MenuFoldOutlined className={styles.siderTrigger} onClick={()=> {setCollapsed(!collapsed)}} />
      </div>
      <ul className={styles.siderMenus}>
        {
          menuList.map((item, index) => <li key={index}>
            <a href={item.router ? item.router : '#!'} className={item.isActive ? styles.active : ''}>
              <i>{item.icon}</i>
              <span>{item.name}</span>
            </a>
          </li>)
        }
      </ul>
      <div className={styles.siderFooter}>
        <div className={styles.languageChange}>
          <span>简体中文</span>
          <UpCircleOutlined />
        </div>
      </div>
    </aside>
    <div className={styles.siderMask}></div>
  </>
}

export default Footer;
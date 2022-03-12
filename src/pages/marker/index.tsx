import React, { useState } from 'react';
import { Pagination } from 'antd'
import { MenuFoldOutlined, UpCircleOutlined, HomeOutlined, GlobalOutlined, GiftOutlined, FundProjectionScreenOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import logo from '../../static/logo.jpeg';
import icon from '../../static/token-logo/bsc-usd-logo.png'

const listData = [
  {
    name: '#13371 Tachi-Arcanline',
    dollar: '8.4166',
    price: '55,000',
  },
  {
    name: '#13371 Tachi-Arcanline',
    dollar: '8.4166',
    price: '55,000',
  },
  {
    name: '#13371 Tachi-Arcanline',
    dollar: '8.4166',
    price: '55,000',
  },
  {
    name: '#13371 Tachi-Arcanline',
    dollar: '8.4166',
    price: '55,000',
  },
  {
    name: '#13371 Tachi-Arcanline',
    dollar: '8.4166',
    price: '55,000',
  },
  {
    name: '#13371 Tachi-Arcanline',
    dollar: '8.4166',
    price: '55,000',
  },
  {
    name: '#13371 Tachi-Arcanline',
    dollar: '8.4166',
    price: '55,000',
  },
  {
    name: '#13371 Tachi-Arcanline',
    dollar: '8.4166',
    price: '55,000',
  },
  {
    name: '#13371 Tachi-Arcanline',
    dollar: '8.4166',
    price: '55,000',
  },
  {
    name: '#13371 Tachi-Arcanline',
    dollar: '8.4166',
    price: '55,000',
  },
  {
    name: '#13371 Tachi-Arcanline',
    dollar: '8.4166',
    price: '55,000',
  },
  {
    name: '#13371 Tachi-Arcanline',
    dollar: '8.4166',
    price: '55,000',
  }
];

const Market: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  return <>
    <div className={`${styles.page} ${!collapsed ? styles.show : styles.hide }`}>
      <div className={styles.pageHeader}>
        筛选区域
      </div>
      <ul className={styles.pageLists}>
        {
          listData.map((item, index) => <li className={styles.listCard} key={index}>
            <div className={styles.cardTop}>
              <div className={styles.cardImage}>
                <img src={logo} />
              </div>
              <div className={styles.cardTitle}>
                <span>{item.name}</span>
              </div>
            </div>
            <div className={styles.cardBottom}>
              <div className={styles.title}>
                Latest Bid
                <span>≈ ${item.dollar}</span>
              </div>
              <div className={styles.value}>
                <div className={styles.valueText}>{item.price}</div>
                <div className={styles.valueToken}>
                  <img src={icon} />JOJO
                </div>
              </div>
            </div>
          </li>)
        }
      </ul>
      <div className={styles.pagePagination}>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  </>
}

export default Market;
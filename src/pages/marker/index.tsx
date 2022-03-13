import React, { useState } from 'react';
import { Pagination, Input, Select,Modal } from 'antd'
import { MenuFoldOutlined, UpCircleOutlined, HomeOutlined, GlobalOutlined, GiftOutlined, FundProjectionScreenOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import logo from '../../static/logo.jpeg';
import icon from '../../static/token-logo/bsc-usd-logo.png'
import Allnft from './components/index'

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

const listDataTwo = [
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

const tabs = ['Auction', 'Market']
const { Search } = Input;
const { Option } = Select;
const Market: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [currentTab, setCurrentTab] = useState(0)
    const [isShow, setIsShow] = useState(false)
    return <>
        <div className={`${styles.page} ${!collapsed ? styles.show : styles.hide}`}>
            <div className={styles.pageHeader}>
                <div className={styles.Tabs}>
                    {
                        tabs.map((item, i) => {
                            return <div className={`${styles.TableOne} ${i === currentTab ? `${styles.activeTab}` : ""
                                }`} 
                                key={i}
                                onClick={() => {
                                    setCurrentTab(i);
                                }}>{item}</div>
                        })
                    }

                </div>
                <div className={styles.searchTrem}>
                    <div className={styles.someBtn} onClick={()=>{
                        setIsShow(!isShow)
                    }}>
                        ALL NFT
                    </div>
                    <Select
                        defaultValue="Latest Sale"
                        className={styles.time}
                    >
                        <Option value="0">Latest Sale</Option>
                        <Option value="1">Lucy</Option>
                        <Option value="2">Tom</Option>
                    </Select>

                    <Search placeholder=""   className={styles.search} style={{ height: 40 }}/>
                </div>

            </div>
            {
                currentTab === 0 ? <ul className={styles.pageLists}>
                    {
                        listData.map((item, index) => <li className={styles.listCard} key={index}>
                            <div className={styles.cardTop}>
                                <div className={styles.cardImage}>
                                    <img src={logo} />
                                    <div className={styles.delayItems}>
                                        <span>167</span> : <span>55</span> :  <span>04</span>
                                    </div>
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
                </ul> : <ul className={styles.pageLists}>
                    {
                        listDataTwo.map((item, index) => <li className={styles.listCard} key={index}>
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
            }

            <div className={styles.pagePagination}>
                <Pagination defaultCurrent={1} total={50} />
            </div>
        </div>
        <Modal title=""   width={750} footer={null} bodyStyle={{height: '750px', overflowY: 'auto'}} visible={isShow} onCancel={()=>{
             setIsShow(!isShow)
        }}>
        <Allnft></Allnft>
      </Modal>
    </>
}

export default Market;
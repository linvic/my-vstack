import React, { useState } from 'react';
import styles from './index.module.less'
import { Tabs } from 'antd';
import Item from 'antd/lib/list/Item';

const tabsList = [
    {
        name: 'Origin JOJO',
        list: [
            "JOJO Farmer",
            "abc",
            "11111",
            "2222",
            "33333",
        ]
    },
    {
        name: '45245235',
        list: [
            "JOJO Farmer",
            "abc",
            "11111",
            "2222",
            "33333",
        ]
    },
    {
        name: 'Origin JOJO',
        list: [
            "JOJO Farmer",
            "abc",
            "11111",
            "2222",
            "33333",
        ]
    }, {
        name: 'frefref',
        list: [
            "JOJO Farmer",
            "abc",
            "11111",
            "2222",
            "33333",
        ]
    }
]


const tabs = ['Auction', 'Market', '33', '44', '666', 'Market']
const { TabPane } = Tabs;
const AllNtf: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0)
    return <>
        <div>
            <div>
            <div className={styles.cardContainer}>
                <Tabs type="card">
                    {tabs.map((item, i) => {
                        return <TabPane tab={item} key={i}>
                           {
                                    tabsList.map((itme, index) => {
                                        return <div className={styles.tabsConent} key={index}>
                                            <div className={styles.conentList}>
                                                <div className={styles.title}>{itme.name}</div>
                                                <ul>
                                                    {
                                                        itme.list.map((i, k) => {
                                                            return <li key={k}>
                                                                {i}
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            </div>

                                        </div>

                                    })
                                }
                        </TabPane>
                    })}
                </Tabs>
            </div>

                
            </div>

        </div>
    </>
}

export default AllNtf;
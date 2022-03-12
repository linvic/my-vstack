import React, { useState } from 'react';
import styles from './index.module.less'
import {  } from 'antd';

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


const tabs = ['Auction', 'Market']
const AllNtf: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0)
    return <>
        <div>
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


            <div className={styles.tabsConent}>
                <div className={styles.conentList}>
                    <div className={styles.title}>reere</div>
                    <ul>
                        <li>1232132</li>
                        <li>1232132232132</li>
                        <li>1232132</li>
                        <li>1232132</li>
                    </ul>
                </div>
                <div className={styles.conentList}>
                    <div className={styles.title}>reere</div>
                    <ul>
                        <li>1232132</li>
                        <li>1232132232132</li>
                        <li>1232132</li>
                        <li>1232132</li>
                    </ul>
                </div>
                <div className={styles.conentList}>
                    <div className={styles.title}>reere</div>
                    <ul>
                        <li>1232132</li>
                        <li>1232132232132</li>
                        <li>1232132</li>
                        <li>1232132</li>
                    </ul>
                </div>
                <div className={styles.conentList}>
                    <div className={styles.title}>reere</div>
                    <ul>
                        <li>1232132</li>
                        <li>1232132232132</li>
                        <li>1232132</li>
                        <li>1232132</li>
                    </ul>
                </div>
                <div className={styles.conentList}>
                    <div className={styles.title}>reere</div>
                    <ul>
                        <li>1232132</li>
                        <li>1232132232132</li>
                        <li>1232132</li>
                        <li>1232132</li>
                    </ul>
                </div>
                <div className={styles.conentList}>
                    <div className={styles.title}>reere</div>
                    <ul>
                        <li>1232132</li>
                        <li>1232132232132</li>
                        <li>1232132</li>
                        <li>1232132</li>
                    </ul>
                </div>
                <div className={styles.conentList}>
                    <div className={styles.title}>reere</div>
                    <ul>
                        <li>1232132</li>
                        <li>1232132232132</li>
                        <li>1232132</li>
                        <li>1232132</li>
                    </ul>
                </div>
                
            </div>
        </div>
    </>
}

export default AllNtf;
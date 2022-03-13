import React, { useState } from 'react';
import styles from './index.module.less'
import {  } from 'antd';
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


const tabs = ['Auction', 'Market','33','44','666','Market','77']
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

            {
                tabsList.map((itme,index)=>{
                    return   <div className={styles.tabsConent} key={index}>
                    <div className={styles.conentList}>
                        <div className={styles.title}>{itme.name}</div>
                        <ul>
                            {
                              itme.list.map((i,k)=>{
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


          
        </div>
    </>
}

export default AllNtf;
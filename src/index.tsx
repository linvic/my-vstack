import 'antd/dist/antd.css';
import './style/main.less';
import './i18n/i18n';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { DAppProvider, useEthers, useTokenBalance } from "@usedapp/core";
import { Card, Layout } from 'antd';
import AppRouter from './routes/router';
import AppHeader from '@/components/header';
import AppMenu from '@/components/Menu';
import AppFooter from '@/components/footer';
import BGIMG from '@/static/bg.jpg';
import { Address } from './constants';

const { Header, Sider, Content, Footer } = Layout;

function App() {
  const { account } = useEthers();
  // const balance = useTokenBalance(Address.CP, account);
  return (
    <Layout hasSider>
      <AppMenu></AppMenu>
      <Layout style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh' }}>
        <Header id="app_header">
          <AppHeader />
        </Header>
        <Content id="app_content" style={{ background: `url(${BGIMG}) round #000` }}>
          {
            account ? <AppRouter /> :
              <div className="d-f jc-c content-page"
                style={{ flexDirection: "column" }}
              >
                <Card title="请先链接钱包用于确认所在网络" >
                  {/* <p>{balance && balance.toString()}</p> */}
                </Card>
              </div>
          }

        </Content>
        <Footer id="app_footer">
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={{}}>
      <Router basename='/dapp'>
        <App />
      </Router>
    </DAppProvider>
  </React.StrictMode>
  , document.querySelector('#root_app'));
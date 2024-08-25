import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined

  } from '@ant-design/icons';

import { Layout, Button, theme } from 'antd';
import { Outlet, Link } from "react-router-dom";
import LeftMenu from './LeftMenu'
import { useAuth } from "./context/auth";
import Loading from './routes/Loading'

const { Header, Sider, Content } = Layout;
// import editorConfig from '../ckeditor-config';
const LayoutAdmin = () => {
    const [auth, setAuth] = useAuth();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
      } = theme.useToken();

    const t = () => {
        console.log('ffff');
    }
    
    if(auth?.token==''){
        return <Loading></Loading>
        
    }
   
    return (
        
        <><Layout className='lMain'>
            <Sider trigger={null} collapsible collapsed={collapsed} className='left-sider' >
                <div className="demo-logo-vertical logo-menu" />
                <LeftMenu></LeftMenu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    
                </Header>
                <Content className='main scrollbar' >
                <Outlet />
                </Content>
            </Layout>
        </Layout>
        </>
    );
}
export default LayoutAdmin;
import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from "react-router-dom";

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

const LeftMenu = () => {
    const navigate = useNavigate();

    return (<Menu
        theme="dark"
        mode="inline" className='menu scrollbar'
        
        items={[
            {
                key: '1',
                icon: <UserOutlined />,
                label: 'Bài viết',
                onClick: () => {
                    navigate('/');
                }
            },
            {
                key: '2',
                icon: <UserOutlined />,
                label: 'Khách hàng',
                onClick: () => {
                    navigate('/customer');
                }
            },
            {
                key: '3',
                icon: <UserOutlined />,
                label: 'Đơn đăng ký',
                onClick: () => {
                    navigate('/orders');
                }
            },
            {
                key: '4',
                icon: <UserOutlined />,
                label: 'Text link',
                onClick: () => {
                    navigate('/textlink');
                }
            },
            {
                key: '5',
                icon: <UserOutlined />,
                label: 'Cấu hình',
                onClick: () => {
                    navigate('/htmlconfig');
                }
            },
            {
                key: '6',
                icon: <UserOutlined />,
                label: 'User',
                onClick: () => {
                    navigate('/user');
                }
            },
        ]}
    />);
}

export default LeftMenu;
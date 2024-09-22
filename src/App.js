import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import LeftMenu from './LeftMenu'
import Home from './Home'
import Login from './pages/Login'
import CreatePost from './pages/post/CreatePost'
import OrderPage from './pages/order/OrderPage'
import TextLink from './pages/textLink/List'
import TextLinkItem from './pages/textLink/Item'
import CustomerPage from './pages/customer/CustomerPage'
import CustomerItem from './pages/customer/Item'
import HtmlConfig from './pages/htmlConfig//List'
import HtmlConfigView from './pages/htmlConfig/Item'
import UsersList from './pages/user/List'
import UserItem from './pages/user/Item'


import LayoutAdmin from './LayoutAdmin';

const { Header, Sider, Content } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (<>
    <BrowserRouter basename='bcooup'>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<Home />} />
          <Route path="/post-detail" element={<CreatePost />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/customer/:id" element={<CustomerItem />} />
          <Route path="/TextLink" element={<TextLink />} />
          <Route path="/TextLink/:id" element={<TextLinkItem />} />
          <Route path="/htmlconfig" element={<HtmlConfig />} />
          <Route path="/htmlconfig/:id" element={<HtmlConfigView />} />
          <Route path="/user" element={<UsersList />} />
          <Route path="/user/:id" element={<UserItem />} />
        </Route>

      </Routes>
    </BrowserRouter>
  </>)
  
};
export default App;
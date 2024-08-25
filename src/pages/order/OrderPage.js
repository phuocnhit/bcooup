import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Modal } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from '../../core/apicore';

const OrderPage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);
    const [open, setOpen] = useState(false);
    const [post, setPost] = useState({});

    const showModal = (post) => {
        setPost(post);
        setOpen(true);
      };
      const hideModal = () => {
        setOpen(false);
      };
      const createAccount =async () => {
        const res = await apiClient('admin/OrderCustomer/CreateAccount?id=' + post.id);
        if (res.status === 200) {
            window.location.reload();
            setOpen(false);
        }

      };
    useEffect(() => {
        loadProducts(1);
    }, []);

    const loadProducts = async (page) => {
        const res = await apiClient('admin/OrderCustomer/list?page=' + page);
        if (res.status === 200 && res.data.code === 200) {
            console.log(res.data.data);
            let b = [];
            setTotalRecord(res.data.totalRecord);
            for (let element of res.data.data) {
                b.push(
                    element
                )
                setData(b);
            }
        }
    }

    const t = (post) => {
       
        showModal(post);
    }
    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Mã đơn',
            dataIndex: 'orderCode',
            key: 'orderCode',
            render: (text) => <a>{text}</a>,
        }, 
        {
            title: 'Ngày tạo',
            dataIndex: 'dateCreated',
            key: 'dateCreated',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<FormOutlined />} onClick={() => t(record)} />
                </Space>
            ),
        },
    ];
    const boxStyle = {
        width: '100%',


    };
    const onChangeTable = (data) => {
        setPage(data.current);
        loadProducts(data.current);
        console.log(data);
    }
    return (
        <>
  
  <Modal
        title="Tạo tài khoản"
        open={open}
        onOk={createAccount}
        onCancel={hideModal}
        okText="Tạo"
        cancelText="Hủy"
      >

      </Modal>
            <Table columns={columns} dataSource={data} onChange={onChangeTable} pagination={{ pageSize: 20, current: page, total: totalRecord, showSizeChanger: false }} />

        </>
    );
}
export default OrderPage;
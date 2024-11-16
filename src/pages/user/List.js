import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Flex } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from '../../core/apicore';

const CustomerPage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);
    const [open, setOpen] = useState(false);



    useEffect(() => {
        loadProducts(1);
    }, []);

    const loadProducts = async (page) => {
        const res = await apiClient('admin/user/list?page=' + page);
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
        navigate({
            pathname: `/user/${post.id}`,
        });
    }
    const columns = [
        {
            title: 'UserName',
            dataIndex: 'userName',
            key: 'userName',
            render: (text) => <a>{text}</a>,
        },

        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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

            <Flex gap="middle" align="start" vertical>
                <Flex style={boxStyle} justify="flex-end" align="flex-start">
                    <Button href="/bcooup#user/0" onClick={() => { }} type="primary" style={{ marginBottom: 16 }}>
                        Thêm mới
                    </Button>
                </Flex>
            </Flex>
            <Table columns={columns} dataSource={data} onChange={onChangeTable} pagination={{ pageSize: 20, current: page, total: totalRecord, showSizeChanger: false }} />

        </>
    );
}
export default CustomerPage;
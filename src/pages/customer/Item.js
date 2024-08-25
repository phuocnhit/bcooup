import React from 'react';
import {
    Button,
    Cascader,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    Upload,
    Space
} from 'antd';
import { PlusOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';

import { useState, useEffect, } from "react";
import { URL_API } from '../../config'
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom'
import apiClient from '../../core/apicore'
import { useAuth } from "../../context/auth";
import { useParams } from 'react-router';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import moment from 'moment';

const CreatePost = () => {
    const [searchParams] = useSearchParams();
    const params = useParams()

    const id = params.id;
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState('')




    useEffect(() => {

        if (id != undefined && id != 0) {
            getDetail();
        }
    }, []);

    const onFinish = async (values) => {

        const formData = new FormData();
        formData.append('Id', id);

        formData.append('Email', values.email);
        formData.append('Name', values.name);
        
        formData.append('Password', values.password??'');
        formData.append('DateVip', values.dateVip);

        const response = await apiClient('admin/customer/AddOrUpdate', { method: 'post', body: formData }); //await axios.post(URL_API + 'admin/post/AddOrUpdate', formData);
        console.log(response);

        window.history.back();


    }
    const getDetail = async () => {
        const res = await apiClient('admin/customer/getbyid?id=' + id);
        if (res.status == 200 && res.data.code == 200) {
            console.log(res.data.data);
            form.setFieldsValue({
                id: res.data.data.id,
                name: res.data.data.name,
                email: res.data.data.email,
                dateVip: res.data.data.dateVip != null ? moment(res.data.data.dateVip) : null
            });

        }
    }
    const [form] = Form.useForm();
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onReset = () => {
        navigate('/');
    }

    return (
        <div className='main-content'>
            <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish} >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="password"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="dateVip"
                    label="Ngày vip"
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Hủy
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}
export default CreatePost;

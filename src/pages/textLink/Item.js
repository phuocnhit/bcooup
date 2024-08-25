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

const CreatePost = () => {
    const [searchParams] = useSearchParams();
    const params = useParams()

    const id = params.id;
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [content, setContent] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(false)

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [fileList, setFileList] = useState([]);



    useEffect(() => {
        console.log('22222222222', id);

        if (id != undefined && id != 0) {
            getDetail();
        }
    }, []);

    const onFinish = async (values) => {
        values.content = content;
        console.log(values);
        const formData = new FormData();
        formData.append('Id', id);

        if (values.file != null && values.file[0].uid != -1) {

            formData.append('upload', values.file[0].originFileObj);
        }
        formData.append('Name', values.name);
        formData.append('Link', values.link);
        formData.append('Revenue', values.Revenue);
      

        const response = await apiClient('admin/textlink/AddOrUpdate', { method: 'post', body: formData }); //await axios.post(URL_API + 'admin/post/AddOrUpdate', formData);
        console.log(response);
        
        window.history.back();


    }
    const getDetail = async () => {
        const res = await apiClient('admin/textlink/getbyid?id=' + id);
        if (res.status == 200 && res.data.code == 200) {
            console.log(res.data.data);
            form.setFieldsValue({
                name: res.data.data.name,
                link:res.data.data.link,   
                Revenue:res.data.data.revenue,           
            });
           
        }
    }
    const [form] = Form.useForm();
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const normFile = (e) => {
        console.log('fffff');
        if (Array.isArray(e)) {
            if (e.length > 0) {

                setImage(true);

            }
            return e;
        }
        return e?.fileList;
    };
    const handleChange = (info) => {
        console.log('ffffffff');
        setFileList([...info.fileList]);

    };
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const onReset = () => {
        navigate('/');
    }

    return (
        <div className='main-content'>
            <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish} >
                <Form.Item
                    name="name"
                    label="Tiêu đề"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="link"
                    label="link"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="Revenue"
                    valuePropName="checked"
                >
                    <Checkbox>Danh thu</Checkbox>
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

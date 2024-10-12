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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from 'moment';

const CreatePost = () => {
    const [searchParams] = useSearchParams();
    const params = useParams()

    const id = params.id;
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState('')
    const [fileList, setFileList] = useState([]);
    const [image, setImage] = useState(false)


    useEffect(() => {

        if (id != undefined && id != 0) {
            getDetail();
        }
    }, []);

    const onFinish = async (values) => {

        const formData = new FormData();
        formData.append('Id', id);

        formData.append('UserName', values.userName);
        formData.append('Name', values.name);
        
        formData.append('Password', values.password??'');

        if (values.file != null && values.file[0].uid != -1) {

            formData.append('upload', values.file[0].originFileObj);
        }
        const response = await apiClient('admin/user/AddOrUpdate', { method: 'post', body: formData }); //await axios.post(URL_API + 'admin/post/AddOrUpdate', formData);
        console.log(response);

        window.history.back();


    }
    const getDetail = async () => {
        const res = await apiClient('admin/user/getbyid?id=' + id);
        if (res.status == 200 && res.data.code == 200) {
            console.log(res.data.data);
            form.setFieldsValue({
                id: res.data.data.id,
                name: res.data.data.name,
                userName: res.data.data.userName,
            });

            if (res.data.data.picture) {

                setFileList([{
                    name: 'image.png',
                    status: 'done',
                    uid: -1,
                    url: URL_API + '/' + res.data.data.picture,
                }])
            }


        }
    }
    const [form] = Form.useForm();
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onReset = () => {
        navigate('/');
    }
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
                    name="userName"
                    label="userName"
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
                <Form.Item label="Ảnh đại diện" name="file" getValueFromEvent={normFile}>
                    <Upload multiple={false} fileList={fileList} showUploadList={true} listType="picture-card" onChange={handleChange} onFinish={() => {
                        console.log('eeeeeeeeee');
                    }} maxCount={1} beforeUpload={() => false}>
                        {fileList.length > 0 ? (
                            null
                        ) : <PlusOutlined />}

                    </Upload>
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

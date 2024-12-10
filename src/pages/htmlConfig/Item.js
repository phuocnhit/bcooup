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
import MyUploadAdapter from '../post/MyUploadAdapter';

const CreatePost = () => {
    const [searchParams] = useSearchParams();
    const params = useParams()

    const id = params.id;
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [content, setContent] = useState('')
    const [name, setName] = useState('')



    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            // Configure the URL to the upload script in your back-end here!
            return new MyUploadAdapter(loader, auth?.token);
        };
    }

    const editorConfiguration = {
        // plugins: [SimpleUploadAdapter],
        htmlSupport: {
            allow: [
                {
                    name: /.*/,
                    attributes: true,
                    classes: true,
                    styles: true
                }
            ]
        },
        extraPlugins: [MyCustomUploadAdapterPlugin],
        // toolbar: ['imageUpload', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],

        // simpleUpload: {
        //   uploadUrl: '/upload-endpoint', // Replace with your server upload endpoint
        // },
    };

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

        formData.append('Location', values.location);
        formData.append('Content',content);
        formData.append('Name',values.name);

        const response = await apiClient('admin/htmlconfig/AddOrUpdate', { method: 'post', body: formData }); //await axios.post(URL_API + 'admin/post/AddOrUpdate', formData);
        console.log(response);
        
        window.history.back();


    }
    const getDetail = async () => {
        const res = await apiClient('admin/htmlconfig/getbyid?id=' + id);
        if (res.status == 200 && res.data.code == 200) {
            console.log(res.data.data);
            form.setFieldsValue({
                location: res.data.data.location,
                name:res.data.data.name                
                   
            });
            setContent(res.data.data.content ?? '');
           
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
                    name="location"
                    label="vị trí"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Nội dung">
                    <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        data={content}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                            editor.ui.view.editable.element.style.height = '1000px';
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                            console.log({ event, editor, data });
                            editor.ui.view.editable.element.style.height = '1000px';
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
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

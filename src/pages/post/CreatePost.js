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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';

import { useState, useEffect, } from "react";
import { URL_API } from '../../config'
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom'
import apiClient from '../../core/apicore'
import { useAuth } from "../../context/auth";
import moment from 'moment';

const CreatePost = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [content, setContent] = useState('')
    const [extend, setExtend] = useState('')
    const [extendDescription, setExtendDescription] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(false)

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [fileList, setFileList] = useState([]);



    useEffect(() => {
        console.log('22222222222', id);

        if (id != undefined && id != '') {
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
        formData.append('Title', values.title);
        formData.append('Content', content);
        formData.append('Description', description);
        formData.append('Revenue', values.revenue);
        formData.append('Score', values.score);
        formData.append('IsTrend', values.isTrend);
        formData.append('IsHome', values.isHome);
        formData.append('Extend', extend);
        formData.append('ExtendDescription', extendDescription);
        formData.append('DateCreated', values.datecreated);

        const response = await apiClient('admin/post/AddOrUpdate', { method: 'post', body: formData }); //await axios.post(URL_API + 'admin/post/AddOrUpdate', formData);
        console.log(response);
        navigate('/');


    }
    const getDetail = async () => {
        const res = await apiClient('admin/post/getbyid?id=' + id);
        if (res.status == 200 && res.data.code == 200) {
            console.log(res.data.data);
            form.setFieldsValue({
                title: res.data.data.title,
                isHome:res.data.data.isHome,
                isTrend:res.data.data.isTrend,
                revenue:res.data.data.revenue,
                score:res.data.data.score,
                datecreated:moment(res.data.data.dateCreated)
            });
            setContent(res.data.data.content ?? '');
            setDescription(res.data.data.description ?? '');
            setExtend(res.data.data.extend ?? '');
            setExtendDescription(res.data.data.extendDescription ?? '');
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
        navigate('/bcooup');
    }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    return (
        <div className='main-content'>
            <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish} initialValues={{ name: '123' }}>
                <Form.Item
                    name="title"
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
                    name="revenue"
                    label="Số tiền"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="score"
                    label="Quan tâm"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="isTrend"
                    valuePropName="checked"
                >
                    <Checkbox>Xu hướng</Checkbox>
                </Form.Item>
                <Form.Item
                    name="isHome"
                    valuePropName="checked"
                >
                    <Checkbox>Trang chủ</Checkbox>
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
                <Form.Item
                    name="datecreated"
                    label="Ngày cập nhật"
                >
                     <DatePicker />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                        }}

                        data={description}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescription(data);
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                </Form.Item>

                <Form.Item label="Nội dung">
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            allowedContent: true,
                            ckfinder: {
                                uploadUrl: `${URL_API}/admin/post/Upload?command=QuickUpload&type=Images&responseType=json&token=${auth?.token}`,
                            },
                            htmlSupport: {
                                allow: [
                                    {
                                        name: /.*/,
                                        attributes: true,
                                        classes: true,
                                        styles: true
                                    }
                                ]
                            }
                            
                        }}
                        data={content}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                            editor.ui.view.editable.element.style.height = '1000px';
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                            
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
                <Form.Item label="Mô tả mở rộng">
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            allowedContent: true,
                            ckfinder: {
                                uploadUrl: `${URL_API}/admin/post/Upload?command=QuickUpload&type=Images&responseType=json&token=${auth?.token}`,
                            },
                            htmlSupport: {
                                allow: [
                                    {
                                        name: /.*/,
                                        attributes: true,
                                        classes: true,
                                        styles: true
                                    }
                                ]
                            }
                            
                        }}

                        data={extendDescription}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                            editor.ui.view.editable.element.style.height = '1000px';
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setExtendDescription(data);
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
                <Form.Item label="Mở rộng">
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            allowedContent: true,
                            ckfinder: {
                                uploadUrl: `${URL_API}/admin/post/Upload?command=QuickUpload&type=Images&responseType=json&token=${auth?.token}`,
                            },
                            htmlSupport: {
                                allow: [
                                    {
                                        name: /.*/,
                                        attributes: true,
                                        classes: true,
                                        styles: true
                                    }
                                ]
                            }
                            
                        }}

                        data={extend}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                            editor.ui.view.editable.element.style.height = '1000px';
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setExtend(data);
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

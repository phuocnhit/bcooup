
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import axios from 'axios';
import { URL_API } from '../config'
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import apiClient from '../core/apicore';

const Login = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const onFinish = async values => {
        debugger;
        const res = await apiClient('admin/Customer/login', { method: 'post', body: values });//  await axios.post(URL_API + 'admin/user/login', values);
        if (res.status == 200 && res.data.code == 200) {
            var data = res.data.data;

            localStorage.setItem("auth", JSON.stringify(data));
            setAuth({ ...auth, token: data, user: data });
            navigate('/');
        }


        console.log('Received values of form: ', values);
    };

    return (
        <div className='center login'>
            <Row>
                <Col span={8} >
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>

                        </Form.Item>
                    </Form></Col>
            </Row>

        </div>
    );
};
export default Login;
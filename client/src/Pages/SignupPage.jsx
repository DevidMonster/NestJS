import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react"
import { useDispatch } from 'react-redux';
import { useSingupMutation } from '../services/auth.service';
import { saveTokenAndUser } from '../slices/authSlice';
import { GoogleOutlined } from '@ant-design/icons';

const SignupPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [signup, { data, isLoading }] = useSingupMutation()


    useEffect(() => {
        if (data?.error) {
            return alert(data.error)
        }
        if (!isLoading && data) {
            dispatch(saveTokenAndUser({ token: data.accessToken, user: data.data }))
            navigate('/')
        }
    }, [data, isLoading])

    const onFinish = (values) => {
        try {
            signup({ ...values, avatar: "https://res.cloudinary.com/dpwto5xyv/image/upload/v1692587346/learnECMAS/t%E1%BA%A3i_xu%E1%BB%91ng_zdwt9p.png" })
            return
        } catch (error) {
            alert('signup failed')
        }
    };

    const validatePhoneNumber = (_, value) => {
        const phoneRegex = /^0\d{9}$/; // Regex để kiểm tra số điện thoại bắt đầu bằng số 0 và có tổng 10 số
        if (value && !phoneRegex.test(value)) {
            return Promise.reject('Please enter a valid phone number!');
        }
        return Promise.resolve();
    };

    return (
        <div style={{ width: '60%', margin: "0 auto" }}>
            <h3 style={{ textAlign: "center", marginTop: "30px" }}>Register</h3>
            <div id='formLogin'
                style={{ width: "50%", margin: "0 auto" }}>
                <Form
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="userName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!', }, { type: 'email', message: 'Please enter a valid email address!' }]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                        label="Phone"
                        name="phoneNumber"
                        rules={[{ validator: validatePhoneNumber }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="passWord"
                        rules={[{ required: true, message: 'Please input your password!' }, { min: 6, message: 'The password must be at least 6 characters long!' }]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="ConfirmPassword"
                        name="confirmPassword"
                        dependencies={['passWord']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('passWord') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}          >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item style={{ textAlign: "center" }} >
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                        <p style={{ textAlign: 'center' }}>Or</p>
                        <Link to={'http://localhost:8000/auth/google/login'}>
                            <Button
                                htmlType='button'
                                type="primary"
                                icon={<GoogleOutlined />}
                            >
                                Login with Google
                            </Button>
                        </Link>
                    </Form.Item>
                    <Form.Item style={{ textAlign: "center" }} >
                        <p>Do you already have an account?  <Link to="/login"> Login here</Link></p>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default SignupPage
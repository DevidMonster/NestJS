import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../services/auth.service';
import { saveTokenAndUser } from '../slices/authSlice';

const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, {data, isLoading, error}] = useLoginMutation()

    useEffect(() => {
        console.log(error)
        if(error?.data?.error) {
            message.error(error?.data?.error)
        }
    }, [error])

    useEffect(() => {
        if(data?.error) {
            return alert(data.error)
        }
        if(!isLoading && data) {
            dispatch(saveTokenAndUser({ token: data.accessToken, user: data.data }))
            if(data.data?.role == 'admin') return navigate('/admin')
            navigate('/')
        }
        
    }, [data, isLoading])

    const onFinish = (values) => {
        try {
            login(values)
            return
        } catch (error) {
            alert('Login failed')
        }
    };
    return (

        <div style={{ width: '60%', margin: "0 auto" }}>
            <h3 style={{ textAlign: "center", marginTop: "30px" }}>Login</h3>
            <div id='formLogin'
                style={{ width: "50%", margin: "0 auto" }}>
                <Form
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!', }, { type: 'email', message: 'Please enter a valid email address!' }]}
                        hasFeedback
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
                    <Form.Item style={{ textAlign: "center" }}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item style={{ textAlign: "center" }}>
                        <p>Do not have an account?<Link to="/signup"> Register here</Link></p>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage
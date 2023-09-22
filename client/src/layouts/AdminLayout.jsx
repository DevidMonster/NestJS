import { useEffect, useState } from 'react';
import {
    DesktopOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    CreditCardOutlined,
    UserOutlined,
    SkinOutlined,
    CommentOutlined,
    FolderOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
import { useSelector } from "react-redux";

function getItem(
    label,
    key,
    icon,
    children,
) {
    return {
        key,
        icon,
        children,
        label,
    }
}

const items = [
    getItem(<NavLink to={'/admin'}>Dashboard</NavLink>, '1', <PieChartOutlined />),
    getItem('Products', '2', <SkinOutlined />, [
        getItem(<NavLink to={'/admin/products'}>Product List</NavLink>, 'sub1'),
        getItem(<NavLink to={'/admin/products/stock'}>Stock</NavLink>, 'sub2'),
        getItem(<NavLink to={'/admin/products/add'}>Add</NavLink>, 'sub3'),
    ]),
    getItem(<NavLink to={'/admin/orders'}>Order List</NavLink>, '3', <CreditCardOutlined />),
    getItem('Posts', '4', <DesktopOutlined />, [
        getItem(<NavLink to={'/admin/posts'}>Post List</NavLink>, 'sub4'),
        getItem(<NavLink to={'/admin/posts/add'}>Add</NavLink>, 'sub5'),
    ]),
    getItem('User', '5', <UserOutlined />, [
        getItem(<NavLink to={'/admin/users'}>Users</NavLink>, 'sub6'),
        getItem(<NavLink to={'/admin/users/add'}>Add</NavLink>, 'sub7'),
    ]),
    getItem('Category', '6', <FolderOutlined />, [
        getItem(<NavLink to={'/admin/categories'}>Categories</NavLink>, 'sub8'),
        getItem(<NavLink to={'/admin/categories/add'}>Add</NavLink>, 'sub9'),
    ]),
    getItem(<NavLink to={'/admin/comments'}>Comments</NavLink>, '7', <CommentOutlined />)
];

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [history, setHistory] = useState('');
    const user = useSelector(state => state.authReducer.user);
    const navigate = useNavigate()

    useEffect(() => {
        setHistory(window.location.pathname)
    }, [window.location.pathname])

    useEffect(() => {
        if (!user || Object.keys(user).length == 0 || (user.role !== "admin" && user.role !== "contributor")) {
            navigate('/login')
        }
    }, [user])

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical">
                    <NavLink to={'/admin'} style={{ color: 'white', fontSize: '25px', fontWeight: 'bold', margin: '10px 0', textAlign: 'center', width: '100%', display: 'block' }}>{!collapsed ? 'DevidMonster' : 'D'}</NavLink>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Breadcrumb items={[{title: history}]}></Breadcrumb>
                <Content style={{ margin: '0 16px' }}>
                    <Outlet context={history} key={history}/>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Post Hooker ©2023 Created by DevidMonster</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
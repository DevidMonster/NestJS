import { Link, useParams } from "react-router-dom";
import { useFetchByUserIdQuery } from "../services/order.service";
import { Layout, Menu, Table, Tag, theme } from 'antd';
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React from "react";
import {
    UserOutlined,
    CreditCardOutlined
} from '@ant-design/icons';

function OrderPage() {
    const { id } = useParams()
    const { data, isLoading } = useFetchByUserIdQuery(id)

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <Tag color="blue">{record.status}</Tag>
            )
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
        },
        {
            title: 'Date',
            key: 'orderDate',
            dataIndex: 'orderDate',
            render: (_, record) => (
                <p>{record.orderDate.slice(0, 10)} / {record.orderDate.slice(11, 16)}</p>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Link to={'/order_detail/' + record.id}>Detail</Link>
            ),
        },
    ];

    const {
        token: { colorBgContainer },
    } = theme.useToken();


    const items = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: 'Your profile',
        },
        {
            key: '2',
            icon: <CreditCardOutlined />,
            label: <Link to={'/orders/'+id}>Orders</Link>,
        }
    ]
    return <div>
        <Layout style={{ height: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                style={{ background: colorBgContainer }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={items}
                />
            </Sider>
            <Layout>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                        <Table loading={isLoading} pagination={false} columns={columns} dataSource={data?.data || []} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    </div>;
}

export default OrderPage;
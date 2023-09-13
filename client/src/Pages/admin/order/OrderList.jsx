import { useEffect } from "react";
import { useFetchAllOrdersQuery } from "../../../services/order.service";
import { Link } from "react-router-dom";
import { Table, Tag } from "antd";

function OrderList() {
    const { data, isLoading, refetch } = useFetchAllOrdersQuery()
    
    useEffect(() => {
        if(data) {
            refetch()
        }
    }, [window.location.pathname])

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
                <Link to={'/admin/orders/' + record.id}>Detail</Link>
            ),
        },
    ];

    return <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Products</h1>
        </div>
        <Table loading={isLoading} columns={columns} dataSource={data?.data} />
    </div>
}

export default OrderList;
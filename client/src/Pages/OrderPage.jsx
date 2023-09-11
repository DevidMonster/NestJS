import { Link, useParams } from "react-router-dom";
import { useFetchByUserIdQuery } from "../services/order.service";
import { Table, Tag } from 'antd';

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
            title: 'Address',
            dataIndex: 'shippingAddress',
            key: 'shippingAddress',
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
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
            title: 'Total Amount',
            key: 'totalAmount',
            dataIndex: 'totalAmount',
            render: (_, record) => (
                <p>{record.totalAmount} VNĐ</p>
            )
        },
        {
            title: 'Payment Method',
            key: 'paymentMethod',
            dataIndex: 'paymentMethod',
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

    return <div>
        <Table loading={isLoading} pagination={false} columns={columns} dataSource={data?.data || []} />
    </div>;
}

export default OrderPage;
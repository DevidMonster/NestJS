import { Button, Popconfirm, Rate, Space, Table, message } from "antd";
import { useFetchAllRateQuery, useRemoveRateMutation } from "../../../services/rate.service";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function RatingPage() {
    const { data, isLoading, refetch } = useFetchAllRateQuery()
    const [removeRating, { error }] = useRemoveRateMutation()

    const confirm = (id) => {
        removeRating(id)
    };

    useEffect(() => {
        if (data) {
            refetch()
        }
    }, [window.location.pathname])

    useEffect(() => {
        if (error?.data?.error) {
            return message.error(error?.data?.error)
        }
    }, [error])

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            render: (_, { user }) => (
                <p>{user.userName}</p>
            )
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            render: (_, { product }) => (
                <Link to={'/admin/posts/edit/' + product?.id}>{product.name}</Link>
            ),
            width: 100,
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            render: (_, { content }) => (
                <p style={{ wordBreak: 'break-all' }}>{content}</p>
            ),
            width: 400
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
            render: (_, { rate }) => (
                <Rate value={rate} disabled/>
            ),
            width: 200
        },
        {
            title: 'Time',
            dataIndex: 'createdAt',
            key: 'commentTime',
            render: (_, record) => (
                <p>{record.createdAt.slice(0, 10)} {record.createdAt.slice(11, 16)}</p>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Delete Comment"
                        description="Are you sure to delete this comment?"
                        onConfirm={() => confirm(record.id)}
                        onCancel={() => message.error('Cancel')}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button size="small">Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return <div>
        <h2>Rates</h2>
        <Table pagination={{ pageSize: 6 }} loading={isLoading} columns={columns} dataSource={data?.data || []} />
    </div>;
}

export default RatingPage;
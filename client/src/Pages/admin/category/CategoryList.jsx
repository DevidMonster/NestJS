import { Link } from "react-router-dom";
import { Button, Popconfirm, Space, Table, message } from "antd";
import { useEffect } from "react";
import { useFetchAllCategoriesQuery, useRemoveCategoryMutation } from "../../../services/category.service";


function CategoryList() {
    const { data, isLoading, refetch } = useFetchAllCategoriesQuery()
    const [removeCate] = useRemoveCategoryMutation()
    
    useEffect(() => {
        if(data) {
            refetch()
        }
    }, [window.location.pathname])

    const confirm = (id) => {
        removeCate(id)
        message.success('Category deleted successfully');
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, { name, id }) => (
                <Link to={'/admin/category/edit/' + id}>{name}</Link>
            )
        },
        {
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
            render: (_, { products }) => (
                <p>{products?.length}</p>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={'/admin/categories/edit/' + record.id}>Edit</Link>
                    <Popconfirm
                        title="Delete category"
                        description="Are you sure to delete this Cate?"
                        onConfirm={() => confirm(record.id)}
                        onCancel={() => message.error('Cancel')}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
            width: 150
        },
    ];

    return <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Categories</h1>
        </div>
        <Table loading={isLoading} columns={columns} dataSource={data?.data} />
    </div>
}

export default CategoryList;
import { Button, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchByIdQuery, useUpdateCategoryMutation } from "../../../services/category.service";
import { useEffect } from "react";

function EditCategory() {
    const { id } = useParams();
    const { data, isLoading } = useFetchByIdQuery(id);
    const [updateCategory] = useUpdateCategoryMutation()
    const navigate = useNavigate()
    const [form] = Form.useForm()

    useEffect(() => {
        if(data?.data && !isLoading) {
            form.setFieldsValue({
                name: data?.data.name
            })
        }
    }, [data, isLoading])

    const onFinish = (values) => {
        updateCategory({ id, cate: { ...values } });
        navigate('/admin/categories')
    };
    return <div>
        <h1>Create New</h1>
        <Form
            form={form}
            style={{ width: '70%', margin: '0 auto' }}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Category Name"
                name="name"
                rules={[{ required: true, message: 'Please input category name!' }]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item style={{ margin: '20px 0' }}>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    </div>;
}

export default EditCategory;
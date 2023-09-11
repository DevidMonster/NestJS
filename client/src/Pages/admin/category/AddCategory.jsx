import { Button, Form, Input} from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation } from "../../../services/category.service";

function AddCategory() {
    const [createCategory] = useCreateCategoryMutation()
    const navigate = useNavigate()

    const onFinish = (values) => {
        createCategory({ ...values });
        navigate('/admin/categories')
    };
    return <div>
        <h1>Create New</h1>
        <Form
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

export default AddCategory;
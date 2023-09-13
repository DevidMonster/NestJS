import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Spin, Upload, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextEditor from "../../../components/TextEditor";
import { useCreateProductMutation } from "../../../services/product.service";
import { useFetchAllCategoriesQuery } from "../../../services/category.service";
import { useUploadFileMutation } from "../../../services/upload.service";
const { Option } = Select
function AddProduct() {
    const [createProduct] = useCreateProductMutation()
    const { data: categories, isLoading } = useFetchAllCategoriesQuery('?_full')
    const [uploadImage] = useUploadFileMutation()
    const navigate = useNavigate()
    const [fileList, setFileList] = useState([])
    const [loading, setLoading] = useState(false)

    const dummyRequest = ({ onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const handleBeforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Kích thước hình ảnh không được vượt quá 10MB!');
        }

        return isJpgOrPng && isLt10M;
    };

    const handleOnChange = ({ fileList }) => {
        setFileList(fileList)
    }


    const onFinish = async (values) => {
        let imageUrl;
        setLoading(true)
        if (fileList.length > 0) {
          const formData = new FormData();
          formData.append("image", fileList[0].originFileObj); // Lấy file gốc từ fileList
    
          try {
            const response = await uploadImage(formData);
            imageUrl = response.data.imageUrl;
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }
        // console.log(imageUrl);
        await createProduct({ ...values, image: fileList.length > 0 ? imageUrl : undefined }).unwrap();
        setLoading(false)
        navigate('/admin/products')
    };
    if(loading) {
        return <Spin/>
    }
    return <div>
        <h1>Create New</h1>
        <Form
            style={{ width: '70%', margin: '0 auto' }}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Product Name"
                name="name"
                rules={[{ required: true, message: 'Please input product name!' }]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Category"
                name="categoryId"
                rules={[{ required: true, message: 'Please select category!' }]}
                hasFeedback
            >
                <Select placeholder="please select category">
                    {!isLoading ? (
                        categories?.data.map((cate, index) => (
                            <Option key={index} value={cate.id}>{cate.name}</Option>
                        ))
                    ) : <></>}
                </Select>
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input price!' }, { type: 'number', min: 0, message: 'price is greater than 0' }]}
                hasFeedback
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: 'Please input quantity!' }, { type: 'number', min: 0, message: 'quantity is greater than 0' }]}
                hasFeedback
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="Discount"
                name="discount"
                rules={[{ required: true, message: 'Please input discount!' }, { type: 'number', min: 0, message: 'discount is greater than 0' }]}
                hasFeedback
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input description!' }, { min: 20, message: 'Nhập ít nhất 20 ký tự' }]}
                hasFeedback
            >
                <TextEditor />
            </Form.Item>
            <Upload
                name="image"
                beforeUpload={handleBeforeUpload}
                customRequest={dummyRequest}
                onChange={handleOnChange}
                listType="picture"
                fileList={fileList}
            >
                {fileList.length === 1 ? "" : <Button icon={<UploadOutlined />}>Click to Upload</Button>}
            </Upload>

            <Form.Item style={{ margin: '20px 0' }}>
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
            </Form.Item>
        </Form>
    </div>;
}

export default AddProduct;
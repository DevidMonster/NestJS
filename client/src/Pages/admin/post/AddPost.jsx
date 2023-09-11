import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import { useState } from "react";
import { useCreatePostMutation } from "../../../services/post.service";
import { useNavigate } from "react-router-dom";
import TextEditor from "../../../components/TextEditor";

function AddPost() {
    const [createPost] = useCreatePostMutation()
    const navigate = useNavigate()
    const [fileList, setFileList] = useState([])

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


    const onFinish = (values) => {
        createPost({ ...values, thumbnail: fileList.length > 0 ? fileList[0].thumbUrl : undefined });
        navigate('/admin/posts')
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
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input title!' }]}
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="SubTitle"
                name="subTitle"
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Content"
                name="content"
                rules={[{ required: true, message: 'Please input content!' }, { min: 20, message: 'Nhập ít nhất 20 ký tự' }]}
                hasFeedback
            >
                <TextEditor/>
            </Form.Item>
            <Upload
                name="avatar"
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

export default AddPost;
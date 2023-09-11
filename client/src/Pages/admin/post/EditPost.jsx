import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message, Image } from "antd";
import { useEffect, useState } from "react";
import { useFetchByIdQuery, useUpdatePostMutation } from "../../../services/post.service";
import { useNavigate, useParams } from "react-router-dom";
import TextEditor from "../../../components/TextEditor";


function EditPost() {
    const { id } = useParams()
    const {data, isLoading} = useFetchByIdQuery(id)
    const [fileList, setFileList] = useState([])
    const [updatePost] = useUpdatePostMutation()
    const navigate = useNavigate()
    const [form] = Form.useForm()

    useEffect(() => {
        if(!isLoading) {
            console.log(data?.data);
            form.setFieldsValue({
                title: data?.data.title,
                subTitle: data?.data.subTitle,
                content: data?.data.content,
            })
        }
    }, [data, isLoading])

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
        console.log(values)
        updatePost({id, post: { ...values, thumbnail: fileList.length > 0 ? fileList[0].thumbUrl : (data?.data.thumbnail ? data?.data.thumbnail : undefined) }});
        navigate('/admin/posts')
    };
    return <div>
        <h1>Update</h1>
        
        <Form
            form={form}
            style={{ width: '70%', margin: '0 auto' }}
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Current Image"
            >
                <Image style={{  width: '200px' }} src={data?.data?.thumbnail}/>
            </Form.Item>
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
                    Save
                </Button>
            </Form.Item>
        </Form>
    </div>;
}

export default EditPost;
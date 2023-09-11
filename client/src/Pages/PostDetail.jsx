import { useNavigate, useParams } from "react-router-dom";
import { useFetchByIdQuery } from "../services/post.service";
import { Divider } from "antd";
import { useEffect } from "react";

function PostDetail() {
    const { id } = useParams()
    const { data, isLoading } = useFetchByIdQuery(id)
    const navigate = useNavigate()

    useEffect(() => {
        if (data?.error) {
            navigate('/')
        }
    }, [data])

    return <div>
        {!isLoading ? <div style={{ width: '80%', margin: '0 auto' }}>
            <div style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: '15px', padding: '10px' }}>
                <Divider orientation="left" orientationMargin="0">
                    {data.data?.title}
                </Divider>
                {data.data?.thumbnail ? <img alt="example" style={{ width: '300px', margin: '0 auto' }} src={data.data.thumbnail} /> : ''}
                <div style={{ padding: '0 20px' }}>
                    <h3>{data.data?.subTitle}</h3>
                    <p dangerouslySetInnerHTML={{ __html:  data.data?.content}}></p>
                </div>
            </div>
        </div> : <></>}
    </div>;
}

export default PostDetail;
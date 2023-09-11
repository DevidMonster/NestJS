import { useFetchAllPostQuery } from '../services/post.service';
import PostCard from '../components/PostCard';
import { Spin } from 'antd';
function PostsPage() {
    const { data, isLoading } = useFetchAllPostQuery()
    return <div>
        {!isLoading ? (
            <PostCard data={data?.data} />
        ) : <Spin />}
    </div>;
}

export default PostsPage;
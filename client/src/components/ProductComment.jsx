import TextArea from "antd/es/input/TextArea";
import { Avatar, Button } from "antd";
import { useEffect, useState } from "react";
import { useCreateCommentMutation, useFetchByIdQuery } from "../services/comment.service";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { io } from 'socket.io-client';

// eslint-disable-next-line react/prop-types
function ProductComment({ productId, style = {} }) {
    const [commentValue, setCommentValue] = useState('')
    // const [socket, setSocket] = useState(null)
    // const [message, setMessage] = useState("")
    const user = useSelector(state => state.authReducer.user)
    const { data, isLoading, refetch } = useFetchByIdQuery(productId)
    const [createComment] = useCreateCommentMutation()

    // useEffect(() => {
    //     const newSocket = io('http://localhost:8000')
    //     setSocket(newSocket)
        
    //     return () => {
    //         newSocket.disconnect()
    //     }
    // }, [])

    // useEffect(() => {
    //     if (socket === null) return
    //     socket.emit('comment', commentValue)
    //     socket.on('comment', (res) => {
    //         setMessage(res.message)
    //         refetch()
    //     })
    // }, [socket, data])

    const handleComment = () => {
        if(commentValue !== '') {
            createComment({
                userId: user.id,
                productId: productId,
                content: commentValue,
            })
            setCommentValue('')
        }
    }
    return <div style={style}>
        {Object.keys(user).length > 0 ?
            <div>
                <div style={data?.data?.length > 3 ? { maxHeight: 'calc(73px*4)', overflowY: 'scroll', overflowX: 'auto' } : {}}>
                    {!isLoading && data?.data?.length > 0 ?
                        data?.data?.map((cmt, index) => (
    
                            <div key={index} style={{ marginBottom: '20px', display: 'flex', gap: '20px', padding: '5px', alignItems: 'center' }}>
                                <div>
                                    <Avatar src={cmt.user.avatar} />
                                </div>
                                <div style={{ flex: '1' }}>
                                    <small style={{ color: 'gray' }}>{cmt.createdAt.slice(0, 10)} {cmt.createdAt.slice(11, 16)}</small>
                                    <h5 style={{ margin: '0' }}>{cmt.user.userName}</h5>
                                    <p style={{ margin: '5px 0', wordBreak: 'break-all' }}>{cmt.content}</p>
                                </div>
                            </div>
                        )) : <div>
                            <p style={{ textAlign: 'center' }}>No comment</p>    
                        </div>}
                </div>
                <TextArea style={{ margin: '20px 0' }} rows={4} value={commentValue} onChange={e => setCommentValue(e.target.value)} placeholder="Comment here">
                </TextArea>
                <Button style={{ margin: '5px 0' }} type="primary" onClick={handleComment}>Submit</Button>
            </div>
            :
            <div>
                <h2>You need login to use this</h2>
                <Link to={'/login'}><Button>Login</Button></Link>
            </div>
        }
    </div>;
}

export default ProductComment;
import { Link, useParams } from "react-router-dom";
import { useFetchByIdQuery, useUpdateOrderMutation } from "../services/order.service";
import { Button, Image, List, Space, Spin, Typography } from "antd";
import RatingModal from "../components/RatingModal";
import { useSelector } from "react-redux";

function OrderDetail() {
    const { id } = useParams()
    const user = useSelector(state => state.authReducer.user)
    const { data, isLoading, refetch } = useFetchByIdQuery(id)
    const [updateStatus] = useUpdateOrderMutation()

    const handleUpdate = () => {
        updateStatus({ id, data: { status: 'canceled' } })
    }

    return <div>
        {!isLoading ? (<div style={{ padding: '20px', width: '70%', margin: '0 auto' }}>
            <Link to={'/orders/'+user.id}><Button type="primary">Back</Button></Link>
            <List
                header={<h3 style={{ margin: 0 }}>Order detail</h3>}
                footer={<h3 style={{ margin: 0 }}>Items</h3>}
                bordered
                dataSource={[data?.data]}
                renderItem={(item) => (
                    <>
                        {
                            Object.keys(item).map((key, index) => {
                                if (key !== 'id' && key !== 'orderDetails')
                                    return (<List.Item key={index}>
                                        <Typography.Text key={key} mark>
                                            {key}:
                                        </Typography.Text>
                                        <span>{item[key]} {key === 'totalAmount' ? 'VNĐ' : ''}</span>
                                    </List.Item>)
                            })
                        }
                    </>
                )}
            />
            <br />
            {data.data?.orderDetails?.map((prd, index) => (
                <div key={index} style={{ margin: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Space>
                        <Image width={120} src={prd.productImage} />
                        <div>
                            <h3>{prd.productName}</h3>
                            <p style={{ color: 'Grey' }}>{prd.price} x {prd.quantity}</p>
                        </div>
                    </Space>
                    {data?.data.status === 'completed' && !prd.rated ?
                        <RatingModal info={{ productId: prd.product.id, orderId: data?.data.id }} callback={refetch}>
                            <Button type="primary" danger>Rating</Button>
                        </RatingModal>
                        : <></>
                    }
                </div>
            ))}
            <br />
            <Button disabled={data?.data.status === 'canceled' || data?.data.status === 'completed'} onClick={handleUpdate} type="primary" danger>{data?.data.status === 'canceled' ? 'Canceled' : 'Cancel order'}</Button>
        </div>)
            :
            (<Spin />)
        }
    </div >;
}

export default OrderDetail;
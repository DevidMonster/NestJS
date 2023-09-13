import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchByIdQuery, useUpdateOrderMutation } from "../../../services/order.service";
import { Select, Image, List, Space, Spin, Typography, Button, message } from "antd";
import { useEffect, useState } from "react";

const status = [
    'pending',
    'canceled',
    'processing',
    'shipped',
    'delivered',
    'returned',
    'on_hold',
    'completed',
    'pending_payment',
    'payment_failed',
]

function OrderManagement() {
    const { id } = useParams()
    const { data, isLoading } = useFetchByIdQuery(id)
    const navigate = useNavigate()
    const [updateStatus, { error }] = useUpdateOrderMutation()
    const [orderStatus, setOrderStatus] = useState(data?.data.status)

    useEffect(() => {
        if(error?.data.message) {
            message.error(error?.data.message)
        }
        setOrderStatus(data?.data.status)
    }, [error, data])

    const handleUpdate = async () => {                
        updateStatus({ id, data: { status: orderStatus } }).unwrap()
        navigate('/admin/orders')
    }

    return <div>
        {!isLoading ? (<div style={{ padding: '20px', width: '450px', margin: '0 auto' }}>
            <Link to={'/admin/orders'}><Button type="primary">Back</Button></Link>
            <List
                style={{ margin: '10px 0' }}
                header={<h3 style={{ margin: 0 }}>Order detail</h3>}
                footer={<div>
                    <Button disabled={data?.data.status === 'completed'} onClick={handleUpdate} type="primary" danger>Save</Button>
                    <hr />
                    <h3 style={{ margin: 0 }}>Items</h3>
                </div>}
                bordered
                dataSource={[data?.data]}
                renderItem={(item) => (
                    <>
                        {
                            Object.keys(item).map((key, index) => {
                                if (key !== 'id' && key !== 'orderDetails') {
                                    if (key === 'status') {
                                        return (<List.Item key={index}>
                                            <Typography.Text key={key} mark>
                                                {key}:
                                            </Typography.Text>
                                            <Select disabled={item[key] === 'canceled'} onChange={(e) => setOrderStatus(e)} value={orderStatus}>
                                                {status.map((sta, index) => (
                                                    <Select.Option key={index} value={sta}>{sta}</Select.Option>
                                                ))}
                                            </Select>
                                        </List.Item>)
                                    }
                                    return (<List.Item key={index}>
                                        <Typography.Text key={key} mark>
                                            {key}:
                                        </Typography.Text>
                                        <span>{item[key]} {key === 'totalAmount' ? 'VNĐ' : ''}</span>
                                    </List.Item>)
                                }
                            })
                        }
                    </>
                )}
            />
            {data.data?.orderDetails?.map((prd, index) => (
                <div key={index} style={{ margin: '10px 0' }}>
                    <Space>
                        <Image width={120} src={prd.productImage} />
                        <div>
                            <h3>{prd.productName}</h3>
                            <p style={{ color: 'Grey' }}>{prd.price} x {prd.quantity}</p>
                        </div>
                    </Space>
                </div>
            ))}
        </div>)
            :
            (<Spin />)
        }
    </div >;
}

export default OrderManagement;
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchOneQuery } from "../services/product.service";
import { Button, Divider, Image, Input, List, Segmented, Spin, message } from "antd";
import ProductComment from "../components/ProductComment";
import { useAddItemMutation } from "../services/cart.service";
import { useSelector } from "react-redux";
import ProductRate from "../components/ProductRate";

function ProductDetail() {
    const { id } = useParams()
    const user = useSelector(state => state.authReducer.user)
    const [quantity, setQuantity] = useState(1)
    const [segmented, setSegmented] = useState('Comments')
    const { data, isLoading } = useFetchOneQuery(id)
    const [addItem] = useAddItemMutation()
    const navigate = useNavigate()

    const handleChange = (value) => {
        setSegmented(value)
    }

    const addItemToCart = async () => {
        try {
            if (user?.id) {

                const response = await addItem({
                    cartId: user.cart.id,
                    productId: id,
                    quantity
                })


                if (response.data) {
                    // Thêm sản phẩm thành công, hiển thị thông báo thành công
                    message.success('Thêm sản phẩm vào giỏ hàng thành công');
                } else {
                    // Thất bại, hiển thị thông báo lỗi
                    message.error(response?.error.data.message);
                }
            } else {
                message.error("You need to login to add item to your cart");
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            message.error(error.message);
        }

    }

    const deCrease = () => {
        if (quantity == 1) return
        setQuantity(prev => prev - 1)
    }

    const inCrease = () => {
        if (quantity == data?.data.quantity) return
        setQuantity(prev => prev + 1)
    }

    const handleOnChange = (value) => {
        if (value === '') setQuantity(1)
        if (value < 1 || value > data?.data.quantity) return
        setQuantity(value)
    }

    useEffect(() => {
        if (data?.error) {
            navigate('/')
        }
    }, [data, navigate])
    return <div>
        {!isLoading && data?.data ? (
            <div style={{ padding: '50px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', height: 'calc(100vh - 300px)' }}>
                    <div style={{ width: "40%", height: '100%' }}>
                        <Image width='100%' height='100%' src={data.data.image ? data.data.image : ''} alt="item image" />
                    </div>
                    <div style={{ flex: '1', height: '100%' }}>
                        <h1>{data.data.name}</h1>
                        <p style={{ margin: '30px 0', fontSize: '1.2rem', fontWeight: 'bold', color: 'Grey' }}>{data.data.price} VNĐ</p>
                        <p style={{ marginTop: '70px' }}>Quantity: {data.data.quantity === 0 ? 'Out of stock' : data.data.quantity}</p>
                        <div style={{ width: '150px', display: 'flex', alignItems: 'center' }}>
                            <Button type="primary" danger onClick={() => deCrease()}>-</Button>
                            <Input type="number" onChange={(e) => handleOnChange(e.target.value)} value={quantity} min={0} max={data.data.quantity} />
                            <Button type="primary" danger onClick={() => inCrease()}>+</Button>
                        </div>
                        <Button onClick={() => addItemToCart(data.data.id)} style={{ margin: "40px 0" }} type="default" danger size="large">Add to card</Button>
                    </div>
                </div>
                <List
                    header={<></>}
                    footer={<></>}
                >
                    <Divider orientation="left" orientationMargin="0"><h2>Description</h2></Divider>
                    <p dangerouslySetInnerHTML={{ __html: data.data?.description }}>
                    </p>
                </List>
                <div>
                    <Segmented style={{ margin: '10px 0' }} value={segmented} onChange={handleChange} options={['Comments', 'Rates']} />
                    {segmented === 'Comments' ?
                        <ProductComment productId={data?.data.id}></ProductComment>
                        :
                        <ProductRate productId={data?.data.id}></ProductRate>
                    }
                </div>

            </div>
        ) : (
            <Spin></Spin>
        )}
    </div>;
}

export default ProductDetail;
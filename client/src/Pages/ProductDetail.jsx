import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchOneQuery } from "../services/product.service";
import { Button, Image, Input, Spin, message } from "antd";
import ProductComment from "../components/ProductComment";
import { useAddItemMutation } from "../services/cart.service";
import { useSelector } from "react-redux";

function ProductDetail() {
    const { id } = useParams()
    const user = useSelector(state => state.authReducer.user)
    const [quantity, setQuantity] = useState(1)
    const { data, isLoading } = useFetchOneQuery(id)
    const [addItem] = useAddItemMutation()
    const navigate = useNavigate()

    const addItemToCart = async (id) => {
        try {
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
                message.error('Thêm sản phẩm vào giỏ hàng thất bại');
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            message.error('Lỗi khi thêm sản phẩm vào giỏ hàng');
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
    }, [data])
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
                <div>
                    <hr />
                    <h1>Comment</h1>
                    <ProductComment productId={data?.data.id}></ProductComment>
                </div>

            </div>
        ) : (
            <Spin></Spin>
        )}
    </div>;
}

export default ProductDetail;
/* eslint-disable react/prop-types */
import { Modal, Rate, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useCreateRateMutation } from "../services/rate.service";
import { useSelector } from "react-redux";

function RatingModal({ info, callback, children }) {
    const user = useSelector(state => state.authReducer.user)
    const [modalOpen, setModalOpen] = useState(false);
    const [rate, setRate] = useState(0);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false)
    const [rating] = useCreateRateMutation();

    console.log({
        content,
        userId: user?.id,
        productId: info?.productId,
        orderId: info?.orderId,
    });

    const handleOnOk = async () => {
        setLoading(true)
        await rating({
            rate,
            content,
            userId: user?.id,
            productId: info?.productId,
            orderId: info?.orderId,
        }).unwrap()
        setLoading(false)
        callback()
        setModalOpen(false)
    }

    return <>
        <div onClick={() => setModalOpen(true)}>{children}</div>
        <Modal
            title="Your Rating"
            centered
            open={modalOpen}
            onOk={handleOnOk}
            onCancel={() => setModalOpen(false)}
        >
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <Spin />
                </div>
            ) : (
                <>
                    <Rate onChange={(e) => setRate(e)}/> {rate}
                    <TextArea onChange={(e) => setContent(e.target.value)} rows={5} placeholder="Share what you like about this product">{content}</TextArea>
                </>
            )}
        </Modal>
    </>;
}

export default RatingModal;
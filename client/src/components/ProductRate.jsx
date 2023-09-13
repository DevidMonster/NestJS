import { Avatar, Rate } from "antd";
import { useFetchByIdQuery } from "../services/rate.service";

// eslint-disable-next-line react/prop-types
function ProductRate({ productId, style = {} }) {
    const { data, isLoading } = useFetchByIdQuery(productId)

    return <div style={style}>
        <div>
            <div style={data?.data?.length > 3 ? { maxHeight: 'calc(73px*4)', overflowY: 'scroll', overflowX: 'auto' } : {}}>
                {!isLoading && data?.data?.length > 0 ?
                    data?.data?.map((rate, index) => (

                        <div key={index} style={{ marginBottom: '20px', display: 'flex', gap: '20px', padding: '5px', alignItems: 'center' }}>
                            <div>
                                <Avatar src={rate.user.avatar} />
                            </div>
                            <div style={{ flex: '1' }}>
                                <Rate value={rate.rate} disabled/>
                                <small style={{ color: 'gray' }}>{rate.createdAt.slice(0, 10)} {rate.createdAt.slice(11, 16)}</small>
                                <h5 style={{ margin: '0' }}>{rate.user.userName}</h5>
                                <p style={{ margin: '5px 0', wordBreak: 'break-all' }}>{rate.content}</p>
                            </div>
                        </div>
                    )) : <div>
                        <p style={{ textAlign: 'center' }}>No Rate</p>
                    </div>}
            </div>
        </div>
    </div>;
}

export default ProductRate;
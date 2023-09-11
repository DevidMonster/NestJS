import { Spin } from "antd";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import { useFetchAllProductsQuery } from "../services/product.service";

function HomePage() {
    const { data, isLoading } = useFetchAllProductsQuery()
    return <div>

        {isLoading ? <Spin /> :
            (
                <>
                    <Banner></Banner>
                    <div style={{ padding: '0 30px' }}>
                        <h1>Products</h1>
                        <ProductCard data={data?.data} />
                    </div>
                </>
            )}
    </div>;
}

export default HomePage;
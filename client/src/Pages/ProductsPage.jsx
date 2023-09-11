import { useState } from 'react';
import { useFetchAllCategoriesQuery } from '../services/category.service';
import { useFetchAllProductsQuery } from '../services/product.service';
import { Button, Spin } from 'antd';
import ProductCard from '../components/ProductCard';

function ProductsPage() {
    const [cateId, setCateId] = useState('');
    const { data: categories, isLoading: cateLoading } = useFetchAllCategoriesQuery()
    const { data, isLoading } = useFetchAllProductsQuery(`?_category=${cateId}`)
    return <div style={{ padding: '10px', height: '100vh' }}>
        <div style={{ width: '20%', position: 'fixed', top: "100px", left: '18px'}}>
            <h1>Danh mục</h1>
            <Button style={{ width: '100%' }} size='large' type='default' onClick={() => setCateId('')}>All</Button>
            {!cateLoading ? (
                categories?.data.map((cate, index) => (
                    <Button style={{ width: '100%' }} size='large' key={index} type='default' onClick={() => setCateId(cate.id)}>{cate.name}</Button>
                ))
            ): <></>}
        </div>
        <div style={{ marginLeft: '22%', height: '100%' }}>
            {!isLoading ? (
                <ProductCard data={data?.data}/>
            ) : <Spin></Spin>}
        </div>
    </div>;
}

export default ProductsPage;
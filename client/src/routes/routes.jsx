import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import PostDetail from '../Pages/PostDetail';
import LoginPage from '../Pages/LoginPage';
import SignupPage from '../Pages/SignupPage';
import DefaultLayout from '../layouts/DefaultLayout';
import AdminLayout from '../layouts/AdminLayout';
import PostList from '../Pages/admin/post/PostList';
import AddPost from '../Pages/admin/post/AddPost';
import EditPost from '../Pages/admin/post/EditPost';
import UserList from '../Pages/admin/user/UserList';
import AddUser from '../Pages/admin/user/AddUser';
import EditUser from '../Pages/admin/user/EditUser';
import Comments from '../Pages/admin/Comments';
import DashBoard from '../Pages/admin/DashBoard';
import ProductDetail from '../Pages/ProductDetail';
import ProductsPage from '../Pages/ProductsPage';
import PostsPage from '../Pages/PostsPage';
import ProductList from '../Pages/admin/product/ProductList';
import Stock from '../Pages/admin/product/Stock';
import AddProduct from '../Pages/admin/product/AddProduct';
import EditProduct from '../Pages/admin/product/EditProduct';
import CategoryList from '../Pages/admin/category/CategoryList';
import AddCategory from '../Pages/admin/category/AddCategory';
import EditCategory from '../Pages/admin/category/EditCategory';
import CartPage from '../Pages/CartPage';
import OrderPage from '../Pages/OrderPage';

const router = createBrowserRouter([
    {path: '/', element: <DefaultLayout/>, children: [
        {path: '/', element: <HomePage/>},
        {path: '/product', element: <ProductsPage/>},
        {path: '/cart/:id', element: <CartPage/>},
        {path: '/product/:id', element: <ProductDetail/>},
        {path: '/post', element: <PostsPage/>},
        {path: '/orders/:id', element: <OrderPage/>},
        {path: '/post/:id', element: <PostDetail/>},
        {path: '/login', element: <LoginPage/>},
        {path: '/signup', element: <SignupPage/>},
    ]},
    {path: '/admin', element: <AdminLayout/>, children: [
        {path: '', element: <DashBoard/>},
        {path: 'products', element: <ProductList/>},
        {path: 'products/stock', element: <Stock/>},
        {path: 'products/add', element: <AddProduct/>},
        {path: 'products/edit/:id', element: <EditProduct/>},
        {path: 'categories', element: <CategoryList/>},
        {path: 'categories/add', element: <AddCategory/>},
        {path: 'categories/edit/:id', element: <EditCategory/>},
        {path: 'posts', element: <PostList/>},
        {path: 'posts/add', element: <AddPost/>},
        {path: 'posts/edit/:id', element: <EditPost/>},
        {path: 'users', element: <UserList/>},
        {path: 'users/add', element: <AddUser/>},
        {path: 'users/edit/:id', element: <EditUser/>},
        {path: 'comments', element: <Comments/>},
    ]},
])

export default router
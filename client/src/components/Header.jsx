import { Avatar, Button, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteTokenAndUser } from "../slices/authSlice";
import { useClearTokenMutation } from "../services/auth.service";
import { ShoppingCartOutlined } from '@ant-design/icons';

function Header() {
    const user = useSelector(state => state.authReducer.user)
    const navigate = useNavigate()
    const [clearToken] = useClearTokenMutation()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(deleteTokenAndUser())
        clearToken()
        navigate('/login')
    }

    const items = [
        {
          label: <Link to={'/orders/'+user?.id}>Your order</Link>,
          key: '0',
        },
        {
          label: <Button onClick={handleLogout} type="primary">Logout</Button>,
          key: '1',
        },
      ];

    return <div style={{ backdropFilter: 'blur(100px)', zIndex: '99', width: '100%', display: 'flex', justifyContent: "space-between", padding: "10px", height: "40px", borderBottom: '1px solid rgba(0,0,0,0.2)', alignItems: 'center', position: 'fixed', top: '0', left: '0' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
            <Link style={{ fontSize: '20px', color: 'black' }} to={'/'}>Đăng</Link>
            <div>
                <Link to={'/'}><Button type="link">Home</Button></Link>
                <Link to={'/product'}><Button type="link">Products</Button></Link>
                <Link to={'/post'}><Button type="link">Posts</Button></Link>

            </div>
        </div>
        <div style={{ paddingRight: '20px' }}>
            {Object.keys(user).length > 0 ?
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to={'/cart/'+user.id}><Button shape="circle"><ShoppingCartOutlined /></Button></Link>
                    <Dropdown menu={{ items }} trigger={['click']}><Avatar src={user.avatar}/></Dropdown>
                </div>
                :
                <>
                    <Link to={'/login'}><Button type="link">Login</Button></Link>
                    <Link to={'/signup'}><Button type="link">Signup</Button></Link>
                </>
            }
        </div>
    </div>;
}

export default Header;
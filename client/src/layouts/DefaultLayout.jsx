import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useGetTokenQuery } from "../services/auth.service";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveTokenAndUser, deleteTokenAndUser } from "../slices/authSlice";

function DefaultLayout() {
    const { data, isLoading, error } = useGetTokenQuery()

    const dispatch = useDispatch()
    useEffect(() => {
        const user = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {}
        if(!isLoading && data?.accessToken && user) {
            dispatch(saveTokenAndUser({ user, token: data.accessToken }))
        }
        if(!isLoading && error?.data?.error) { 
            dispatch(deleteTokenAndUser())
        }
    }, [data, isLoading, error])
    return <div style={{ fontFamily: 'sans-serif' }}>
        <Header></Header>
        <div style={{ padding: '20px 0', marginTop: '70px' }}><Outlet /></div>
    </div>;
}

export default DefaultLayout;
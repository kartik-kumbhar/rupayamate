import React, { useEffect } from 'react'
import { useAuth } from "../../store/auth"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
    const { LogoutUser, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        LogoutUser();
        navigate("/login");
    }, [LogoutUser]);

    if (!isLoggedIn) {
        toast.success("Logout Successfully");
    }
}

export default Logout

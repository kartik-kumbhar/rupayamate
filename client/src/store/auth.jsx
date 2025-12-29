import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const storetokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    }
    const LogoutUser = () => {
        setToken(null);
        setUser(null);
        return localStorage.removeItem('token');
    }

    const userAuthentication = async () => {
        const response = await axios.get("https://rupayamate.onrender.com/users/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const data = await response.data;
            // console.log(data)
            setUser(data.user);
        }
    }

    useEffect(() => {
        if (token) {
            userAuthentication();
        }
    }, [token]);

    let isLoggedIn = !!token; //if yes then true else false

    return <AuthContext.Provider value={{ isLoggedIn, storetokenInLS, LogoutUser, token, user }}>
        {props.children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authValue = useContext(AuthContext);
    return authValue;
}
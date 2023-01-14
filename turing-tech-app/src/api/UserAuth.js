import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function UserAuth() {
    const navigate = useNavigate();

    //getToken krain g k user k pass token hei ya nahi
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }
    //same for user ya to ye kr sakty bar bar api call kr k check krain ya session may storange kr lain
    const getUser = () => {
        const tokenUser = sessionStorage.getItem('user');
        const user_details = JSON.parse(tokenUser);

        return user_details;
    }

        //variables token get krnay k liyay ur user b tah k bar bar api call na krni paray user k liyay
        const [token, setToken] = useState(getToken());
        const [user, setUser] = useState(getUser());
    

    const saveToken = (user, token) => {
        //yaha 2option hain local b user kr saktay hain ur session be
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('dashboard');
    }
    const http = axios.create({
        baseURL: "https://frontend-test-api.aircall.io",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        http
    }
}
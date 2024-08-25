import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });



    useEffect(() => {
        const dataCache = localStorage.getItem("auth");
        if (dataCache) {

            const data = JSON.parse(dataCache);
            setAuth({ ...auth, token: data, user: data });
            // axios config
            axios.defaults.baseURL = process.env.REACT_APP_API;
            axios.defaults.headers.common["Authorization"] = data ? `Bearer ${data}` : '123';

        }
    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

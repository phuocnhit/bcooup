// apiClient.js
import { URL_API } from '../config'
import axios from 'axios';

async function apiClient(endpoint, { method = 'GET', body, headers = {} } = {}) {
    // const navigate = useNavigate();

    

    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        validateStatus: () => {
            return true;
        }
    };




    // if (body) {
    //     config.body = JSON.stringify(body);
    // }

    try {
        const response =   await axios.post(`${URL_API}/${endpoint}`, body, {validateStatus:(a)=>{
            return true;
        }})

        // const response = await fetch(`${URL_API}/${endpoint}`, config);
        if (response.status == 401) {
            window.location.href='/bcooup#login';
        }
        return response;

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`API request failed: ${error.message}`);
    }
}

export default apiClient;

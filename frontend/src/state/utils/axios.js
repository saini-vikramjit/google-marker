// AXIOS
import axios                          from 'axios';


// Setting base config 
export const instance = axios.create({
    baseURL: 'http://127.0.0.1:8090/api',
    timeout: 5000,
    headers: {
        post: {
            'Content-Type': 'application/json'
        }
    }
  });
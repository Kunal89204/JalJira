import axios from "axios";


export const axiosInstance = axios.create({
    baseURL:"https://jaljira-backend.onrender.com/api",
    headers:{
        "Content-Type": "application/json"
    },
    // withCredentials:true
})
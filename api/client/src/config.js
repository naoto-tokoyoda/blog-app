import axios from "axios"


export const axiosInstance = axios.create({
    baseURL: "https://naoto-blog.herokuapp.com/api/"
})
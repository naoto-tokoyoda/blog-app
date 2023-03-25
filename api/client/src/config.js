import axios from "axios"


export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api/" || "https://naoto-blog.herokuapp.com/api/",
    headers: {
        "Content-Type": "application/json", // Set the content type to application/json
      },
})
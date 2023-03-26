import axios from "axios"


// export const axiosInstance = axios.create({
//     //when you use localhost use this
//     baseURL: "http://localhost:5001/api/",
    
//     //when you use heroku use this
//     // baseURL: "https://naoto-blog.herokuapp.com/api/",
//     headers: {
//         "Content-Type": "application/json", // Set the content type to application/json
//       },
// })

export const axiosInstance = axios.create({
    //when you use localhost use this
    // baseURL: process.env.REACT_APP_API_URL,
    
    //when you use heroku use this
    baseURL: process.env.REACT_APP_PROD_API_URL,
    headers: {
        "Content-Type": "application/json", // Set the content type to application/json
      },
})


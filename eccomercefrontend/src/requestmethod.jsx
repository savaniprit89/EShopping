import axios from "axios";


const BASE_URL="https://eccomerce-n4q3.onrender.com/api"
const TOKEN=""
export const publicrequest=axios.create({
    baseURL:BASE_URL,
})

export const userrequest=axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN} `}
})
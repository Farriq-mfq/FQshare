import axios from "axios"
import { AxiosInstance } from 'axios'
const apiModule = (): AxiosInstance => {
    const api = axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    })

    return api
}

const api = apiModule()

export { api }
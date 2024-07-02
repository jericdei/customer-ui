import Axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

const axios = Axios.create({
    baseURL,
})

export default axios

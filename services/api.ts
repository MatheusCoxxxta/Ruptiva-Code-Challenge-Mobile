import axios from "axios"
import ENV from "../env"


const api = axios.create({
  baseURL: ENV.dev.apiURL
})

export default api

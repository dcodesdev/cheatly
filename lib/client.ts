import axios from "axios"
import Cookies from "js-cookie"

const client = axios.create({
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
})

export default client

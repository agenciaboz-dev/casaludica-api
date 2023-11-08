import axios from "axios"

const api = axios.create({
    baseURL: "https://app.agenciaboz.com.br:4118/api",
})

const order = {
    new: async (data: BozPayOrder) => {
        const response = await api.post("/order/new", data)
        return response.data
    },
}

export default { order }

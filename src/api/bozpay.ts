import axios from "axios"

const api = axios.create({
    // baseURL: "https://app.agenciaboz.com.br:4118/api",
    baseURL: "https://agencyboz.com:4118/api",
})

const order = {
    new: async (data: BozPayOrder) => {
        const response = await api.post("/order/new", data)
        return response.data
    },
    get: async (store: string, referenceId?: string, id?: number) => {
        const response = await api.post("/order", { store, referenceId, id })
        return response.data
    },
    updateStatus: async (data: { status: string; id: number }) => {
        const response = await api.post("/order/status", data)
        return response.data
    },
}

const getStore = (store_id: number) => `casaludica.mkt-${store_id}`

export default { order, getStore }

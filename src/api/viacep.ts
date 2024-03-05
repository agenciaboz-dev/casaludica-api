import axios from "axios"
import { CepResult } from "../types/viacep/CepResult"

const api = axios.create({
    baseURL: "https://viacep.com.br/ws",
    timeout: 1000 * 10,
})

const search = async (cep: string | NumberConstructor) => (await api.get(`/${cep}/json/`)).data as CepResult

export default { search }

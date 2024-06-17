import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { CepResult } from "../types/viacep/CepResult"
import igest from "../api/igest"
import { Franchise } from "../class/Franchise"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/", async (request: Request, response: Response) => {
    const data = request.body as CepResult

    const franchises = await igest.get.franchises({})

    // TODO GAMBIARRONA
    const francisco_gambiarra = [
        "4101002", // Ampére
        "4102604", // Barracão
        "4102752", // Bela Vista da Caroba
        "4103024", // Boa Esperança do Iguaçu
        "4103156", // Bom Jesus do Sul
        "4103222", // Bom Sucesso do Sul
        "4104501", // Capanema
        "4105409", // Chopinzinho
        "4105706", // Clevelândia
        "4106456", // Coronel Domingos Soares
        "4106506", // Coronel Vivida
        "4106571", // Cruzeiro do Iguaçu
        "4107207", // Dois Vizinhos
        "4107405", // Enéas Marques
        "4107850", // Flor da Serra do Sul
        "4108403", // Francisco Beltrão
        "4109658", // Honório Serpa
        "4111209", // Itapejara do Oeste
        "4114351", // Manfrinópolis
        "4114401", // Mangueirinha
        "4115309", // Mariópolis
        "4115408", // Marmeleiro
        "4116950", // Nova Esperança do Sudoeste
        "4117255", // Nova Prata do Iguaçu
        "4117602", // Palmas
        "4118501", // Pato Branco
        "4119004", // Pérola do Oeste
        "4119251", // Pinhal de São Bento
        "4119806", // Planalto
        "4120358", // Pranchita
        "4121406", // Realeza
        "4121604", // Renascença
        "4122800", // Salgado Filho
        "4123006", // Salto do Lontra
        "4123808", // Santa Izabel do Oeste
        "4124400", // Santo Antônio do Sudoeste
        "4124806", // São João
        "4125209", // São Jorge do Oeste
        "4126272", // Saudade do Iguaçu
        "4126652", // Sulina
        "4128609", // Verê
        "4128708", // Vitorino
    ]

    const franchise = new Franchise(
        franchises.find((item) => {
            // todo gambiarra
            if (francisco_gambiarra.includes(data.ibge)) {
                return item.Endereco.CodigoIbge == "4108403" && item.Ativo
            }
            // todo fim da gambiarra

            return item.Endereco.CodigoIbge == data.ibge && item.Ativo
        }) || (await igest.get.franchisor())
    )
    response.json(franchise)
})

router.post("/refresh", async (request: Request, response: Response) => {
    const data = request.body as { franchise_id: number }
    console.log("refreshing franchise")

    const igest_franchise = await igest.get.franchises({ empresa: data.franchise_id })
    const franchise = new Franchise(igest_franchise[0])
    response.json(franchise)
})

export default router

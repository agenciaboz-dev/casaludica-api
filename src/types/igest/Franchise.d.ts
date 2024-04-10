declare interface IgestFranchise {
    IdEmpresa: number
    Ativo: boolean
    RazaoSocial: string
    NomeFantasia: string
    Cnpj: string
    Email: string
    Whatsapp: string
    Endereco: {
        Logradouro: string
        Numero: string
        Complemento: string //add
        Bairro: string
        Cep: string
        Cidade: string
        Estado: string
        CodigoIbge: string
    }
    PagSeguroToken: string
    PagSeguroTokenSandbox: string
    CartaoCreditoChavePublica: string
}

declare interface FranchiseParams {
    empresa?: number
}

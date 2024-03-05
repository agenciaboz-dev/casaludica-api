declare interface Franchise {
    IdEmpresa: number
    Ativo: boolean
    RazaoSocial: string
    NomeFantasia: string
    Cnpj: string
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
}

declare interface FranchiseParams {
    empresa?: number
}

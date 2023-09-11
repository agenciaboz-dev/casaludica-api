declare interface Franchise {
    IdEmpresa: number
    Ativo: boolean
    RazaoSocial: string | null
    NomeFantasia: string | null
    Cnpj: string | null
    Endereco: {
        Logradouro: string | null
        Numero: string | null
        Complemento: string | null //add
        Bairro: string | null
        Cep: string | null
        Cidade: string | null
        Estado: string | null
        CodigoIbge: string | null
    }
}

declare interface FranchiseParams {
    empresa?: number
}

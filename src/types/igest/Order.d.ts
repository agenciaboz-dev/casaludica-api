export enum PaymentType {
    boleto = 1,
    pix = 2,
    cartao = 3,
}

export declare interface IgestNewOrder {
    IdEmpresa: number
    IdentificadorPedido: number
    TipoPagamento: PaymentType
    ValorFrete: number
    Cliente: {
        CpfCnpj: string
        InscricaoEstadual: string | null
        Rg: string | null
        Nome: string
        Endereco: string
        Numero: string
        Bairro: string
        Complemento: string | null
        Cidade: string
        Estado: string
        Cep: string
        CodigoIbge: string
        Telefone: string | null
        Email: string | null
    }

    ListaProduto: {
        IdProduto: number
        Quantidade: number
        PrecoVenda: number

        ListaVariacao?: {
            IdEstoqueVariacao: number
            Quantidade: number
        }[]
    }[]
}

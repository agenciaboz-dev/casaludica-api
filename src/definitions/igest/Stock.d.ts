declare interface Stock {
    IdProduto: number
    EstoqueTotal: number
    EstoqueVariacao: {
        IdEstoqueVariacao: number
        IdAtributo1: number | null
        IdAtributo2: number | null
        IdAtributo3: number | null
        IdAtributo4: number | null
        IdAtributo5: number | null
        Estoque: number
    }[]
}

declare interface StockParams {
    empresa: number //IdEmpresa
    produto?: number //IdProduct
}

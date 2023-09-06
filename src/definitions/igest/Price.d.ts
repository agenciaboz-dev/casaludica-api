declare interface Price {
    IdProduto: number
    PrecoVenda: number
}

declare interface PriceParams {
    empresa: number //IdEmpresa
    produto?: number //IdProduct
}

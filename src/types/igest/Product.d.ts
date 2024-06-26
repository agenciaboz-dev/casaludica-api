declare interface IgestProduct {
    IdProduto: number
    DataAlteracao: string
    Ativo: boolean
    IdGrupo?: number
    Codigo: string
    CodigoBarra: string // null
    Descricao: string
    DescricaoEducativa: string // null
    Tags: string // null
    IdFaixaEtaria?: number
    FaixaEtariaDescricao: string
    IdMarca?: number
    MarcaDescricao: string
    Largura: number
    Altura: number
    Comprimento: number
    PesoBruto: number
    PesoLiquido: number
    LinkVideo: string // null
    PrazoEntrega: number
    PrecoVenda: number
    EstoqueTotal: number
    TotalVenda: number
    TotalVenda7Dias: number
    TotalVenda30Dias: number
    AvaliacaoNota: number
    AvaliacaoQuantidade: number

    EstoqueVariacao: Variant
}

declare interface ProductParams {
    empresa: string
    produto?: string
}

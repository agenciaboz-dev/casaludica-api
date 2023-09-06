declare interface Product {
    IdProduto: number
    DataAlteracao: string
    Ativo: boolean
    Codigo: string
    CodigoBarra: null
    Descricao: string
    DescricaoEducativa: null
    Tags: null
    IdFaixaEtaria: number
    IdMarca: number
    Largura: number
    Altura: number
    Comprimento: number
    PesoBruto: number
    PesoLiquido: number
    LinkVideo: null
    DisponibilidadeEmpresa: {
        IdEmpresa: number
        IdVariacao: number
    }[]
}

declare interface ProductParams {
    produto?: string
}

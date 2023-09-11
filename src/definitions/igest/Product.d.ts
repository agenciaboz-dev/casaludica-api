declare interface Product {
    IdProduto: number
    DataAlteracao: string | null
    Ativo: boolean
    IdGrupo: number
    Codigo: string | null
    CodigoBarra: string | null// null
    Descricao: string | null
    DescricaoEducativa: string | null// null
    Tags: string | null// null
    IdFaixaEtaria: number
    IdMarca: number
    Largura: number
    Altura: number
    Comprimento: number
    PesoBruto: number
    PesoLiquido: number
    LinkVideo: string | null// null
    DisponibilidadeEmpresa: {
        IdEmpresa: number
        IdVariacao: number | null
    }[]
}

declare interface ProductParams {
    produto?: string
}

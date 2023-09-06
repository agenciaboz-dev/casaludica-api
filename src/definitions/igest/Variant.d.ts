declare interface Variant {
    IdVariacao: number
    Descricao: string
    ListaDetalhamento: {
        IdDetalhamento: number
        Ordem: number
        Descricao: string
        ListaAtributo: {
            IdAtributo: number
            Ordem: number
            Descricao: string
        }[]
    }[]
}

declare interface VariantParams {
    variacao?: number // IdVariacao
}

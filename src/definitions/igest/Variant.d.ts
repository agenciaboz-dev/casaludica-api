declare interface Variant {
    IdVariacao: number
    Descricao: string | null
    ListaDetalhamento: {
        IdDetalhamento: number
        Ordem: number
        Descricao: string | null
        ListaAtributo: {
            IdAtributo: number
            Ordem: number
            Descricao: string | null
        }[]
    }[]
}

declare interface VariantParams {
    variacao?: number // IdVariacao
}

declare interface Age {
    IdFaixaEtaria: number
    Ativo: boolean
    Descricao: string | null
}

declare interface AgeParams {
    faixa?: number // IdFaixaEtaria
}

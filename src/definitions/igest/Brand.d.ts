declare interface Brand {
    IdMarca: number
    Ativo: boolean
    Descricao: string | null
}

declare interface BrandParams {
    marca?: number // IdMarca
}

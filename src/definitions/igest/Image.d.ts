declare interface Image {
    IdProduto: number
    Imagem1Base64: string | null
    Imagem2Base64: string | null
    Imagem3Base64: string | null
    Imagem4Base64: string | null
    Imagem5Base64: string | null
}

declare interface ImageParams {
    produto: number //IdProduto
}

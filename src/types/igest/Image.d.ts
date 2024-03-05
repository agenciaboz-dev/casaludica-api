declare interface Image {
    IdProduto: number
    Imagem1Base64: string
    Imagem2Base64: string
    Imagem3Base64: string
    Imagem4Base64: string
    Imagem5Base64: string
}

declare interface ImageParams {
    produto: number //IdProduto
    principal: boolean
}

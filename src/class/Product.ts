import { Prisma, PrismaClient } from "@prisma/client"
import igest from "../api/igest"

const prisma = new PrismaClient()

export class Product {
    id: number
    name: string
    cover: string
    images?: string
    date?: Date
    description?: string
    resume?: string
    featured?: Boolean
    price: number
    stock?: number
    category?: number
    tags?: string
    weight?: number
    width?: number
    height?: number
    lenght?: number
    sold: number
    ageRating: string
    brand: string
    rating: number

    constructor(igest_product: IgestProduct) {
        this.id = igest_product.IdProduto
        this.category = igest_product.IdGrupo || 0
        this.date = igest_product.DataAlteracao ? new Date(igest_product.DataAlteracao) : undefined
        this.description = igest_product.DescricaoEducativa || ""
        this.featured = false
        this.height = igest_product.Altura
        this.lenght = igest_product.Comprimento
        this.width = igest_product.Largura
        this.images = this.name = igest_product.Descricao || ""
        this.price = igest_product.PrecoVenda
        this.resume = igest_product.Descricao || ""
        this.sold = igest_product.TotalVenda
        this.stock = igest_product.EstoqueTotal
        this.tags = igest_product.Tags || ""
        this.weight = igest_product.PesoBruto
        this.ageRating = igest_product.FaixaEtariaDescricao
        this.brand = igest_product.MarcaDescricao
        this.rating = igest_product.AvaliacaoNota
    }

    static async getImages(id: number, mainOnly?: boolean) {
        const imagesObg = await igest.get.images({ produto: id, principal: !!mainOnly })
        const images = [
            imagesObg?.Imagem1Base64,
            imagesObg?.Imagem2Base64,
            imagesObg?.Imagem3Base64,
            imagesObg?.Imagem4Base64,
            imagesObg?.Imagem5Base64,
        ]
            .filter(Boolean)
            .toString()

        return images
    }
    async getImage(mainOnly?: boolean) {
        const images = await Product.getImages(this.id, mainOnly)

        this.cover = images.split(",")[0] || ""
        return images
    }
}

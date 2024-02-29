export class Category {
    id: number
    name: string
    collectionId: number

    constructor(igest_category: IgestCategory) {
        this.id = igest_category.IdGrupo
        this.name = igest_category.Descricao
        this.collectionId = igest_category.IdGrupoTitulo
    }
}

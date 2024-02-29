export class Collection {
    id: number
    name: string

    constructor(igest_collection: IgestCollection) {
        this.id = igest_collection.IdGrupoTitulo
        this.name = igest_collection.Descricao
    }
}

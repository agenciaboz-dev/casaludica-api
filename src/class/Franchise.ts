export class Franchise {
    id: number
    active: boolean
    name: string
    fantasy_name: string
    cnpj: string
    address: {
        street: string
        number: string
        complement: string
        district: string
        cep: string
        city: string
        uf: string
        ibge: string
    }

    constructor(data: IgestFranchise) {
        this.id = data.IdEmpresa
        this.active = data.Ativo
        this.name = data.RazaoSocial
        this.fantasy_name = data.NomeFantasia
        this.cnpj = data.Cnpj
        this.address = {
            street: data.Endereco.Logradouro,
            number: data.Endereco.Numero,
            complement: data.Endereco.Complemento,
            district: data.Endereco.Bairro,
            cep: data.Endereco.Cep,
            city: data.Endereco.Cidade,
            uf: data.Endereco.Estado,
            ibge: data.Endereco.CodigoIbge,
        }
    }
}

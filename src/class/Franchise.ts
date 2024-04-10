export class Franchise {
    id: number
    active: boolean
    name: string
    fantasy_name: string
    cnpj: string
    email: string
    phone: string
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
    pagseguro_token: string
    pagseguro_token_sandbox: string
    credit_card_public_key: string

    constructor(data: IgestFranchise) {
        this.id = data.IdEmpresa
        this.active = data.Ativo
        this.name = data.RazaoSocial
        this.fantasy_name = data.NomeFantasia
        this.cnpj = data.Cnpj
        this.email = data.Email
        this.phone = data.Whatsapp
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
        this.pagseguro_token = data.PagSeguroToken
        this.pagseguro_token_sandbox = data.PagSeguroTokenSandbox
        this.credit_card_public_key = data.CartaoCreditoChavePublica
    }
}

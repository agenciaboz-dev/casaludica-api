import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export const user_errors = [
    { key: "username", message: "nome de usuário já cadastrado" },
    { key: "email", message: "erro: este e-mail já está cadastrado" },
    { key: "cpf", message: "erro: cpf já cadastrado" },
    { key: "google_id", message: "erro: conta google já cadastrada" },
]

export const handlePrismaError = (error: unknown) => {
    if (error instanceof PrismaClientKnownRequestError) {
        const target = error.meta?.target as string | undefined
        const match = target?.match(/_(.*?)_/)
        if (match) {
            const key = match[1]
            const message = user_errors.find((item) => item.key == key)?.message
            return message || "Erro desconhecido"
        }
    }

    return "Erro desconhecido"
}

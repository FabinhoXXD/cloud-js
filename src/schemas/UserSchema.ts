import { z } from "zod";

export const UserCreateSchema = z.object({
    body: z.object({
        name: z
            .string({ message: "O nome precisa ser um texto" })
            .min(3, { message: "o nome precisa ter no minimo 3 letras" }),
        email: z
            .email({ message: "Precisa ser um email valido" }),
        password: z
            .string({ message: "A senha e obrigatoria" })
            .min(6, { message: "A senha deve ter no minimo 6 caracteres" }),
        passwordRepeat: z
            .string({ message: "A senha e obrigatoria" })
            .min(6, { message: "A senha deve ter no minimo 6 caracteres" }),
    })
        .refine((data) => data.password === data.passwordRepeat, {
            message: "As senhas não coincidem",
            path: ["passwordRepeat"], // aponta o erro pro campo certo
        })
})


export const UserAuthSchema = z.object({
    body: z.object({
        email: z
            .email({ message: "Precisa ser um email valido" }),
        password: z
            .string({ message: "A senha e obrigatoria" })
            .min(6, { message: "A senha deve ter no minimo 6 caracteres" }),
    })
})



export const UserListSchema = z.object({
    query: z.object({
        email: z
            .email({ message: "Precisa ser um email valido" })
            .optional()
    })
})
export type UserList = z.infer<typeof UserListSchema>["query"];
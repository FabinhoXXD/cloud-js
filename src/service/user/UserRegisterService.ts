import prismaClient from "../../prisma/index";
import { hash } from "bcryptjs";

interface UserRegisterProps {
    name: string;
    email: string;
    password: string;
}

class UserRegisterService {
    async execute({ name, email, password }: UserRegisterProps) {
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if (userAlreadyExists) throw new Error("Usuario ja existe!");

        const passwordHash = await hash(password,8);

        const user = await prismaClient.user.create({
            data:{
                name,
                email,
                password:passwordHash
            },
            select:{
                id:true,
                name:true,
                email:true,
                role:true,
                createdAt:true
            }
        })

        return user;
    }
}

export { UserRegisterService }
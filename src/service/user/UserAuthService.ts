import { compare } from "bcryptjs";
import prismaClient from "../../prisma/index";
import { sign } from "jsonwebtoken";

interface UserAuthProps {
    email: string;
    password: string;
}

class UserAuthService {
    async execute({ email, password }: UserAuthProps) {
        const user = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (!user) throw new Error("Email ou senha estao incorretos");

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) throw new Error("Email ou senha estao incorretos");

        const token = sign({
            name: user.name,
            email: user.email
        },process.env.JWT_SECRET as string,{
            subject: user.id,
            expiresIn: "30d"
        });

        return {
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:token
        }

    }
}

export { UserAuthService }
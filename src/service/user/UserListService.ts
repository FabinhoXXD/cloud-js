import prismaClient from "../../prisma/index"

interface UserListProps {
    email?: string;
}

class UserListService {
    async execute({ email }: UserListProps) {
        if (email) {
            const user = await prismaClient.user.findFirst({
                where: {
                    email
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
            if(!user) return {message:"Usuario nao encontrado"}
            return user;
        }

        const users = prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });

        return users;
    }
}

export { UserListService }
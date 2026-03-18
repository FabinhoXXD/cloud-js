import { Request, Response } from "express";
import { UserListService } from "../../service/user/UserListService";
import { UserList } from "../../schemas/UserSchema"

class UserListController {
    async handle(req:Request, res:Response){
        const { email } = req.query as UserList;

        const userListService = new UserListService();
        const result = await userListService.execute(email ? { email } : {});
        return res.json(result)
    }
}

export { UserListController }
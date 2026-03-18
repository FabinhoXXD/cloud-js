import { Request, Response } from "express"
import { UserRegisterService } from "../../service/user/UserRegisterService";

class UserRegisterController {
    async handle(req: Request, res: Response) {
        const { name, email, password, passwordRepeat } = req.body;

        const userRegisterService = new UserRegisterService();

        const result = await userRegisterService.execute({ name, email, password });

        return res.json(result)
    }
}

export { UserRegisterController }
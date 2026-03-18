import { Request, Response } from "express"
import { UserAuthService } from "../../service/user/UserAuthService"

class UserAuthController {
    async handle(req:Request, res:Response) {
        const {email,password} = req.body
        
        const userAuthService = new UserAuthService();

        const result = await userAuthService.execute({email,password});

        return res.json(result);
    }
}

export { UserAuthController }
import { Request, Response } from "express"
import { SystemStatusService } from "../../service/system/SystemStatusService"

class SystemStatusController {
    async handle(req: Request, res: Response) {
        const systemStatusService = new SystemStatusService();

        const result = await systemStatusService.execute();

        return res.json(result);
    }
}

export { SystemStatusController }
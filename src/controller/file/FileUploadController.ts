import { Request, Response } from "express"

class FileUploadController {
    async handle(req: Request, res: Response) {

        const files = req.files as Express.Multer.File[];
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'Nenhum arquivo enviado' });
        }
        console.log(files);

        const uploadedFiles = files.map(file => ({
            filename: file.filename,
            path: file.path,
            size: file.size,
        }));

        return res.json({
            message: 'Upload feito com sucesso',
            files: uploadedFiles,
        });
    }
}

export { FileUploadController }
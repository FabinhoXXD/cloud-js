import { Request, Response } from "express"
import fs from 'fs';
import path from 'path';

class FileListController {
    async handle(req: Request, res: Response) {
        // Caminho da pasta
        const uploadFolder = path.join(process.cwd(), "uploads");

        // Faz leitura de todos os arquivos
        const files = fs.readdirSync(uploadFolder);

        //faz leitura dos arquivos e monta os objetos para retornar
        const fileList = files.map(file => {
            const extension = path.extname(file);
            return {
                name: file,
                extension: extension ? extension.slice(1) : '',
                url: `${req.protocol}://${req.get("host")}/uploads/${encodeURIComponent(file)}`
            }
        });
        return res.json(fileList);
    }
}

export { FileListController }
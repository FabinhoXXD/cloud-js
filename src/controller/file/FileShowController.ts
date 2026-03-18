import { Request, Response } from "express"
import path from 'path';
import fs from 'fs';

class FileShowController {
    async handle(req: Request, res: Response) {
        let { filename } = req.params; 

        if (Array.isArray(filename)) filename = filename[0];

        // Verifica se e undefined ou vazio
        if (!filename) return res.status(400).json({ error: 'Nome do arquivo não informado' });

        // Evita path traversal
        if (filename.includes('..')) return res.status(400).json({ error: 'Nome de arquivo inválido' });

        const filePath = path.join(process.cwd(), 'uploads', filename);

        if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Arquivo não encontrado' });

        res.sendFile(filePath);
    }
}

export { FileShowController }
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Cria pasta se não existir
function ensureDirExists(caminho: string) {
    if (!fs.existsSync(caminho)) fs.mkdirSync(caminho, { recursive: true });
}

// Pasta de upload primário
const primaryPath = path.resolve(process.cwd(), 'uploads');
ensureDirExists(primaryPath);

// Configuração de storage com tipagem explícita
const storage = multer.diskStorage({
    destination: (
        _req: Request,
        _file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) => {
        cb(null, primaryPath);
    },
    filename: (
        _req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
    ) => {
        const safeName = `${Date.now()}-${file.originalname}`;
        cb(null, safeName);
    },
});

// Aceita todos os tipos de arquivo
const fileFilter = (_req: Request, _file: Express.Multer.File, cb: FileFilterCallback) => {
    cb(null, true);
};

// Executar multer com os dados dentro de um objeto
export const uploadPrimaryMultiple = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB por arquivo
    fileFilter,
}).array('files', 20); // até 20 arquivos
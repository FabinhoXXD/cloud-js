import cors from 'cors';
import "dotenv/config";
import express,{Request, Response,NextFunction} from 'express';
import { router } from "./routes";
import path from 'path';

const app = express();
const PORT = process.env.PORT! || 3333;

app.use(express.json());
app.use(cors());
app.use(router);


app.use((error:Error, _:Request, res:Response, next:NextFunction)=>{
    if(error instanceof Error){
        return res.status(400).json({
            error: error.message
        });
    }
    return res.status(500).json({
        error: "Internal server error!"
    });
});

app.listen(PORT,() => {
    console.log("Servidor rodando na porta " + PORT);
})
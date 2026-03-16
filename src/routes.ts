import {Router, Request, Response,NextFunction} from 'express';

const router = Router();

//Route test
router.get("/",(req:Request, res:Response, next:NextFunction)=>{
    console.log("Test get console");
    res.json({message:"Test get response"})
})


export {router};
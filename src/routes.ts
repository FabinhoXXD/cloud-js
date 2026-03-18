import express,{Router, Request, Response,NextFunction} from 'express';


//middlewares
import { isAuth } from './middleware/isAuth';
import { uploadPrimaryMultiple } from './middleware/uploadMulter';

//Schemas
import { validateSchema } from './middleware/validateSchema';
import { UserCreateSchema, UserAuthSchema, UserListSchema } from './schemas/UserSchema';

//Controllers
import { UserRegisterController } from './controller/user/UserRegisterController';
import { UserAuthController } from './controller/user/UserAuthController';
import { UserListController } from './controller/user/UserListController';
import { SystemStatusController } from './controller/system/SystemStatusController';
import { FileUploadController } from './controller/file/FileUploadController';
import { FileListController } from './controller/file/FileListController';
import { FileShowController } from './controller/file/FileShowController';

const router = Router();

//Route test
router.get("/",(req:Request, res:Response, next:NextFunction)=>{
    console.log("Test get console");
    res.json({message:"Test get response"})
})

// ---------------- ROTAS
//Register e login
router.post("/register",validateSchema(UserCreateSchema),new UserRegisterController().handle);
router.post("/auth",validateSchema(UserAuthSchema),new UserAuthController().handle);
router.get("/userlist",validateSchema(UserListSchema),isAuth, new UserListController().handle);

//system
router.get("/systemstatus",isAuth,new SystemStatusController().handle);

//file
router.post("/fileupload",isAuth,uploadPrimaryMultiple,new FileUploadController().handle);
router.get("/filelist",isAuth,new FileListController().handle);
router.get('/uploads/:filename', new FileShowController().handle); // colocar isauth

export {router};
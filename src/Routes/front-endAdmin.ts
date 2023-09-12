import express from 'express';
import path from 'path';
import { validateMiddleWare } from '../Middlewares/tokenMiddleware';
import {isAdminMiddleWare} from '../Middlewares/isAdminMiddleware';

const FrontAdminRouter = express();

FrontAdminRouter.set("views",path.join(__dirname, "../../front-end/Core"));
FrontAdminRouter.set("view engine","ejs");
FrontAdminRouter.use(express.static(path.join(__dirname, "../../front-end/Core")));


FrontAdminRouter.get('/addproduct',validateMiddleWare,isAdminMiddleWare,(req:express.Request,res:express.Response)=>{
    try{
        res.render('addproduct');
        //res.sendFile(path.join(__dirname, "../../front-end/index.html"));
    }
    catch(err){
        res.status(404).send('home page is not found');
    }
});
export default FrontAdminRouter;
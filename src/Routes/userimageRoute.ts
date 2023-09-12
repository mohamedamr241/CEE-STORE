import express from 'express';
import path from 'path';
import { validateMiddleWare } from '../Middlewares/tokenMiddleware';
import logging from '../Utils/logger';

const userimagesRouter = express();
userimagesRouter.use(express.static(path.join(__dirname, "../../userImages")));

userimagesRouter.get('/userImages/:imageName',validateMiddleWare,(req:express.Request,res:express.Response)=>{
    try{
        const { imageName } = req.params;
        logging.log('info',"successfully geting image of user from cart route");
        res.contentType('image/PNG');
        res.sendFile(path.join(__dirname, '../../userImages', imageName))
    }
    catch(err){
        logging.log('error',`error in getting image of products in cart route: ${err}`);
        res.status(404).send('image is not found');
    }
});
export default userimagesRouter;

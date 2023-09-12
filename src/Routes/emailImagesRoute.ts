import express from 'express';
import path from 'path';
import { validateMiddleWare } from '../Middlewares/tokenMiddleware';
import logging from '../Utils/logger';

const emailimagesRouter = express();
emailimagesRouter.use(express.static(path.join(__dirname, "../../front-end/Emails/images")));

emailimagesRouter.get('/emailImage/:imageName',validateMiddleWare,(req:express.Request,res:express.Response)=>{
    try{
        const { imageName } = req.params;
        logging.log('info',"successfully geting image of email route");
        res.contentType('image/PNG');
        res.sendFile(path.join(__dirname, '../../front-end/Emails/images', imageName))
    }
    catch(err){
        logging.log('error',`error in getting image of email route: ${err}`);
        res.status(404).send('image is not found');
    }
});
export default emailimagesRouter;

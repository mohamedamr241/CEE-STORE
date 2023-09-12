import express from 'express';
import path from 'path';
import { validateMiddleWare } from '../Middlewares/tokenMiddleware';
import logging from '../Utils/logger';

const FrontRouter = express();

FrontRouter.set("views",path.join(__dirname, "../../front-end/Core"));
FrontRouter.set("view engine","ejs");
FrontRouter.use(express.static(path.join(__dirname, "../../front-end/Core")));

FrontRouter.get('/home',(req:express.Request,res:express.Response)=>{
    try{
        res.render('index');
        logging.log('info',"getting home page in route");
        //res.sendFile(path.join(__dirname, "../../front-end/index.html"));
    }
    catch(err){
        res.status(404).send('home page is not found');
    }
});
FrontRouter.get('/products',validateMiddleWare,(req:express.Request,res:express.Response)=>{
    try{
        res.render('products');
        //res.sendFile(path.join(__dirname, "../../front-end/products.html"));
    }
    catch(err){
        res.status(404).send('products page is not found');
    }
});
FrontRouter.get('/about',validateMiddleWare,(req:express.Request,res:express.Response)=>{
    try{
        res.render('about');
        //res.sendFile(path.join(__dirname, "../../front-end/about.html"));
    }
    catch(err){
        res.status(404).send('about page is not found');
    }
});
FrontRouter.get('/contact',validateMiddleWare,(req:express.Request,res:express.Response)=>{
    try{
        res.render('contact');
        //res.sendFile(path.join(__dirname, "../../front-end/contact.html"));
    }
    catch(err){
        res.status(404).send('contact page is not found');
    }
});
FrontRouter.get('/cart',validateMiddleWare,(req:express.Request,res:express.Response)=>{
    try{
        res.render('cart');
        //res.sendFile(path.join(__dirname, "../../front-end/contact.html"));
    }
    catch(err){
        res.status(404).send('cart page is not found');
    }
});
FrontRouter.get('/profile',validateMiddleWare,(req:express.Request,res:express.Response)=>{
    try{
        res.render('profile');
        //res.sendFile(path.join(__dirname, "../../front-end/index.html"));
    }
    catch(err){
        res.status(404).send('home page is not found');
    }
});
export default FrontRouter;
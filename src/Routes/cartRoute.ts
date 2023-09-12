import express from 'express';
import {validateMiddleWare} from '../Middlewares/tokenMiddleware';
import logging from '../Utils/logger';
import { addCart ,cartId,addProductToCart,removeProductFromCart,incrementPro,decrementPro,getProductsFromCart} from '../Controllers/cartCont';
import {getUserId} from '../Controllers/userCont';

const cartRouter = express();

cartRouter.post('/create',async(req:express.Request,res:express.Response)=>{
    try{
        const username = req.body.username;
        if(username == undefined){
            res.status(401).send(`you are not authorized`);
        }
        else{
            const id = await getUserId(username);
            const result = await addCart(id);
            logging.log('info',"successfully adding cart in route");
            res.json({
                status:'success',
                data:{result},
                message:'adding cart successfully'
            })
        }
    }
    catch(err){
        logging.log('error',"error adding cart in route");
        res.status(400).send(`error while creating cart for user: ${err}`)
    }
});

cartRouter.post('/addToCart',async(req:express.Request,res:express.Response)=>{
    try{
        const id = req.cookies.id;
        if(id == null){
            res.status(401).send(`you are not authorized`);
        }
        else{
            const idOfCart = await cartId(id);
            const product_id = req.body.productid;
            const product_quantity = req.body.quantity;
            const result = await addProductToCart(idOfCart,product_id,product_quantity);
            logging.log('info',"successfully adding product to cart in route");
            res.json({
                status:'success',
                data:{result},
                message:'adding product to cart successfully'
            })
        }
    }
    catch(err){
        logging.log('error',"error adding product to cart in route");
        res.status(400).send(`error while adding product to cart for user: ${err}`)
    }
});

cartRouter.post('/removeFromCart',async(req:express.Request,res:express.Response)=>{
    try{
        const id = req.cookies.id;
        if(id == null){
            res.status(401).send(`you are not authorized`);
        }
        else{
            const idOfCart = await cartId(id);
            const product_id = req.body.productid;
            const result = await removeProductFromCart(idOfCart,product_id);
            logging.log('info',"successfully removing product from cart in route");
            res.json({
                status:'success',
                data:{result},
                message:'removing product from cart successfully'
            })
        }
    }
    catch(err){
        logging.log('error',"error removing product from cart in route");
        res.status(400).send(`error while removing product from cart for user: ${err}`)
    }
});
cartRouter.post('/increment',async(req:express.Request,res:express.Response)=>{
    try{
        const id = req.cookies.id;
        if(id == null){
            res.status(401).send(`you are not authorized`);
        }
        else{
            const idOfCart = await cartId(id);
            const product_id = req.body.productid;
            const result = await incrementPro(idOfCart,product_id);
            logging.log('info',"successfully increment product in cart in route");
            res.json({
                status:'success',
                data:{result},
                message:'increment product in cart successfully'
            })
        }
    }
    catch(err){
        logging.log('error',"error increment product in cart in route");
        res.status(400).send(`error while incrementing product in cart for user: ${err}`)
    }
});

cartRouter.post('/decrement',async(req:express.Request,res:express.Response)=>{
    try{
        const id = req.cookies.id;
        if(id == null){
            res.status(401).send(`you are not authorized`);
        }
        else{
            const idOfCart = await cartId(id);
            const product_id = req.body.productid;
            const result = await decrementPro(idOfCart,product_id);
            logging.log('info',"successfully decrement product in cart in route");
            res.json({
                status:'success',
                data:{result},
                message:'decrement product in cart successfully'
            })
        }
    }
    catch(err){
        logging.log('error',"error decrement product in cart in route");
        res.status(400).send(`error while decrementing product in cart for user: ${err}`)
    }
});
cartRouter.get('/get',async(req:express.Request,res:express.Response)=>{
    try{
        const id = req.cookies.id;
        if(id == null){
            res.status(401).send(`you are not authorized`);
        }
        else{
            const idOfCart = await cartId(id);
            
            const result = await getProductsFromCart(idOfCart);
            logging.log('info',"successfully getting product of user from cart in route");
            res.json({
                status:'success',
                data:{...result},
                message:'getting product successfully from cart successfully'
            })
        }
    }
    catch(err){
        logging.log('error',"error getting product from cart in route");
        res.status(400).send(`error while getting product from cart for user: ${err}`)
    }
});
export default cartRouter;

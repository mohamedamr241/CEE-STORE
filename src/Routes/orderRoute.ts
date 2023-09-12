import express from 'express';
import { orderItems } from "../Types/orderItemsType";
import {createOrder,addOrderItems} from '../Controllers/orderCont';
import {validateMiddleWare} from '../Middlewares/tokenMiddleware';
import {quantityValidation} from '../Middlewares/quantityValidation';
import {orderDashboard} from '../Controllers/orderCont';
import logging from '../Utils/logger';

const orderRouter= express();


orderRouter.post('/create',quantityValidation,validateMiddleWare,async (req:express.Request,res:express.Response)=>{
    try{
        const id =req.cookies.id;
        const price = req.body.price;
        const result = await createOrder(price, id);
        res.json({
            status:'success',
            data:{result},
            message:'user task is done successfully'
        })
    }
    catch(err){
        res.status(400).send('error in create order in routes');
    }
});
orderRouter.post('/addOrderProducts',validateMiddleWare,async (req:express.Request,res:express.Response)=>{
    try{
        const arr = req.body.obj;
        let responseArr=[];
        for(const x of arr){
            let orderId = x.orderid;
            let price = x.price;
            let productid = x.productid;
            let quantity = x.quantity;
            let result = await addOrderItems(orderId,productid,price,quantity);
            responseArr.push(result);
        }
        
        res.json({
            status:'success',
            data:{responseArr},
            message:'user task is done successfully'
        })
    }
    catch(err){
        res.status(400).send('error in adding order items in routes');
    }
});
orderRouter.get('/show/current',validateMiddleWare,async (req:express.Request,res:express.Response)=>{
    try{
        const id = req.cookies.id;
        const result = await orderDashboard(id as unknown as number,'active');
        logging.log('info',"successfully getting all cuttern orders route ");
        res.json({
            status:'success',
            data:{...result},
            message:'getting orders successfully'
        })
    }
    catch(err){
        logging.log('error',`error in showing current order in routes: ${err}`);
        res.status(400).send('error in showing order in routes');
    }
});

orderRouter.get('/show/completed',validateMiddleWare,async (req:express.Request,res:express.Response)=>{
    try{
        const id = req.cookies.id;
        const result = await orderDashboard(id as unknown as number,'completed');
        logging.log('info',"successfully getting all completed orders route ");
        res.json({
            status:'success',
            data:{...result},
            message:'getting orders successfully'
        })
    }
    catch(err){
        res.status(400).send('error in create order in routes');
    }
});


export default orderRouter;
import express from 'express';
import { productModel } from '../Models/productModel';

export const quantityValidation = async (req:express.Request,res:express.Response,next:Function)=>{
    try {
        let productMod:productModel = new productModel();
        const arr = req.body.obj;
        let check:boolean=true;
        for(const x of arr){
            const product_id=x.productId;
            const quantity=x.quantity;
            const result = await productMod.SearchById(product_id);
            if(result.quantity<quantity){
                check=false;
                res.status(403);
                res.json('This quantity is unavailable');
                break;
            }
        }
        if(check){
            next();
        }

    } catch (error) {
        res.status(403);
        res.json('error in the quantity validation middleware');
    }
}
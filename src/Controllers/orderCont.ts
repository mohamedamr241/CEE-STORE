import {orders,orderInfo, orderTest} from '../Types/orderType';
import { orderItems } from "../Types/orderItemsType";
import {orderModel} from '../Models/orderModel';
import {productModel} from '../Models/productModel';
import { userModel } from '../Models/userModel';
import {orderDash} from '../Services/orderDashboard';
import logging from '../Utils/logger';
import {orderItemsModel} from '../Models/orderItemsModel';

let ordermodel:orderModel = new orderModel();
let productMod:productModel = new productModel();
export const createOrder = async (price:number,id:number):Promise<orders>=>{
    try{
        const result = await ordermodel.create(price,id);
        //await productMod.update(quantity,product_id);
        logging.log('info',"successfully adding order controller");
        return result;
    }
    catch(err){
        logging.log('error',`error in creating order controller: ${err}`);
        throw new Error(`create order error in controller: ${err}`);
    }
}

export const showCurrentOrdersOfUser = async(user_id:number,username:string):Promise<orderInfo[]> =>{
    try{
        const result = await ordermodel.show(user_id,'active');
        let objarr:orderInfo[] = [];
        for(const x of result){
            const productInfo = await productMod.SearchById(x.product_id as unknown as number);
            let newobj:orderInfo={
                name:productInfo.name,
                price:productInfo.price,
                quantity:x.quantity,
                description:productInfo.description,
                image:productInfo.image,
                category:productInfo.category,
                username:username,
                status:x.status
            };
            objarr.push(newobj);
        }
        logging.log('info',"successfully showing all current orders in controller");
        return objarr;
    }
    catch(err){
        logging.log('error',`error in showing all current orders in controller: ${err}`);
        throw new Error(`show orders of user error in controller: ${err}`);
    }
}
export const orderDashboard = async(id:number,status:string):Promise<orderTest[]>=>{
    try{
        let obj:orderDash = new orderDash();
        const result = await obj.show(id,status);
        logging.log('info',"successfully showing orders dashboard controller");
        return result;
    }
    catch(err){
        logging.log('error',`error in showing orders dashboard controller: ${err}`);
        throw new Error(`show completed orders of user error in controller: ${err}`);
    }
}
export const showCompletedOrdersOfUser = async(user_id:number):Promise<orderInfo[]> =>{
    try{
        let ordermodel:orderModel = new orderModel();
        let productMod:productModel = new productModel();
        let userModelClass:userModel = new userModel();
        const result = await ordermodel.show(user_id,'completed');
        let objarr:orderInfo[] = [];
        for(const x of result){
            const productInfo = await productMod.SearchById(x.product_id as unknown as number);
            const userInfo = await  userModelClass.selectUserName(x.user_id as unknown as number);
            let newobj:orderInfo={
                name:productInfo.name,
                price:productInfo.price,
                quantity:x.quantity,
                description:productInfo.description,
                image:productInfo.image,
                category:productInfo.category,
                username:userInfo.username,
                status:x.status
            };
            objarr.push(newobj);
        }
        return objarr;
    }
    catch(err){
        throw new Error(`show completed orders of user error in controller: ${err}`);

    }
}

export const addOrderItems = async (orderid:number, productid:number,price:number, quantity:number):Promise<orderItems>=>{
    try{
        let orderItemsMod:orderItemsModel = new orderItemsModel();
        let result = await orderItemsMod.add(orderid, productid, price, quantity);
        await productMod.update(quantity,productid);
        return result;
    }
    catch(err){
        throw new Error(`adding order items error in controller: ${err}`);

    }
}
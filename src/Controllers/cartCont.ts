import { cartDashboard } from "../Services/cartDashboard";
import { cartInfo, cartItem, cartItems } from "../Types/cartType";
import logging from "../Utils/logger";

export const addCart = async(id:number):Promise<cartInfo>=>{
    try{
        let obj:cartDashboard = new cartDashboard();
        const result = await obj.create(id);
        logging.log('info',"successfully adding cart in controller");

        return result;
    }
    catch(err){
        logging.log('error',"error in adding cart in controller");
        throw new Error(`adding cart error in controller: ${err}`);
    }
}
export const cartId = async(id:number):Promise<number>=>{
    try{
        let obj:cartDashboard = new cartDashboard();
        const result = await obj.idOfCart(id);
        logging.log('info',"successfully getting cart id in controller");
        return result;
    }
    catch(err){
        logging.log('error',"error in getting cart id in controller");
        throw new Error(`getting cart id error in controller: ${err}`);
    }
}
export const addProductToCart = async(cartid:number,productid:number,quantity:number):Promise<cartItem>=>{
    try{
        let obj:cartDashboard = new cartDashboard();
        const result = await obj.add(cartid, productid,quantity);
        logging.log('info',"successfully adding product to cartin controller");
        return result;
    }
    catch(err){
        logging.log('error',"error in adding product to cart in controller");
        throw new Error(`adding product to cart error in controller: ${err}`);
    }
}

export const removeProductFromCart = async(cartid:number,productid:number):Promise<cartItem>=>{
    try{
        let obj:cartDashboard = new cartDashboard();
        const result = await obj.delete(cartid, productid);
        logging.log('info',"successfully removing product from cartin controller");
        return result;
    }
    catch(err){
        logging.log('error',"error in removing product from cart in controller");
        throw new Error(`removing product from cart error in controller: ${err}`);
    }
}
export const incrementPro = async(cartid:number,productid:number):Promise<cartItem>=>{
    try{
        let obj:cartDashboard = new cartDashboard();
        const result = await obj.increment(cartid, productid);
        logging.log('info',"successfully increment product in cart in controller");
        return result;
    }
    catch(err){
        logging.log('error',"error in increment product in cart in controller");
        throw new Error(`increment product in cart error in controller: ${err}`);
    }
}
export const decrementPro = async(cartid:number,productid:number):Promise<cartItem>=>{
    try{
        let obj:cartDashboard = new cartDashboard();
        const result = await obj.decrement(cartid, productid);
        logging.log('info',"successfully decrement product in cart in controller");
        return result;
    }
    catch(err){
        logging.log('error',"error in decrement product in cart in controller");
        throw new Error(`decrement product in cart error in controller: ${err}`);
    }
}
export const getProductsFromCart = async(cartid:number):Promise<cartItems[]>=>{
    try{
        let obj:cartDashboard = new cartDashboard();
        const result = await obj.get(cartid);
        logging.log('info',"successfully getting product from cart in controller");
        return result;
    }
    catch(err){
        logging.log('error',"error in getting product from cart in controller");
        throw new Error(`getting product from cart error in controller: ${err}`);
    }
}

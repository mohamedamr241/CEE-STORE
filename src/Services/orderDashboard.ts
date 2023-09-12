import { orderTest } from '../Types/orderType';
import client from '../Utils/database';
import logging from '../Utils/logger';


export class orderDash{
    async show(user_id:number,status:string):Promise<orderTest[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT orders.id, product.name, orderitems.price, product.description, product.image FROM orderitems inner join orders ON  orderitems.order_id = orders.id inner join product ON orderitems.product_id = product.id WHERE orders.status= ($1) AND orders.user_id= ($2)';
            const result = await conn.query(sql, [status,user_id]);
            conn.release;
            logging.log('info',"successfully getting order in model");
            //console.log("models: ",result.rows)
            return result.rows;
        }
        catch(err){
            logging.log('error',`error in getting orders in model: ${err}`);
            throw new Error(`show orders error in models: ${err}`);
        }
    }
} 
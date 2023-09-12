import { orderItems } from "../Types/orderItemsType";
import client from "../Utils/database";

export class orderItemsModel {
    async add (orderid:number, productid:number, price:number, quantity:number):Promise<orderItems>{
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO orderitems (order_id,product_id,quantity,price) VALUES ($1,$2,$3,$4) RETURNING *';
            const result = await conn.query(sql, [orderid, productid, quantity, price]);
            conn.release;
            return result.rows[0];
        }
        catch(err){
            throw new Error(`adding order items error in models: ${err}`);
        }
    }
}
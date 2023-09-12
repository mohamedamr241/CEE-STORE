import client from '../Utils/database';
import {order,orders} from '../Types/orderType';
import logging from '../Utils/logger';

export class orderModel{
    async create(price:number, id:number):Promise<orders>{
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (user_id,price) VALUES ($1,$2) RETURNING *';
            const result = await conn.query(sql, [id,price]);
            conn.release;
            logging.log('info',"successfully createing order in models");
            return result.rows[0];
        }
        catch(err){
            logging.log('error',`error in creating order model: ${err}`);
            throw new Error(`create order error in models: ${err}`);
        }
    }
    async show(id:number,status:string):Promise<order[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
            const result = await conn.query(sql, [id,status]);
            conn.release;
            logging.log('info',"successfully showing order model");
            return result.rows;
        }
        catch(err){
            logging.log('error',`error in showing orders in model: ${err}`);
            throw new Error(`show orders error in models: ${err}`);
        }
    }
}
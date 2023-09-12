import client from '../Utils/database';
import logging from '../Utils/logger';
import {cartInfo,cartItem,cartItems} from '../Types/cartType';

export class cartDashboard{
    async create(id:number):Promise<cartInfo>{
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO cart (userid) VALUES ($1) RETURNING *';
            const result = await conn.query(sql, [id]);
            conn.release;
            logging.log('info',"successfully adding cart in model");
            return result.rows[0];
        }
        catch(err){
            logging.log('error',"error adding cart in model");
            throw new Error(`adding cart error in model: ${err}`);
        }
    }
    async add(cartid:number,productid:number,quantity:number):Promise<cartItem>{
        try{
            const conn = await client.connect();
            const sql1 = 'SELECT cart_id,product_id,quantity FROM cartitems WHERE cart_id=($1) AND product_id=($2)';
            const result1 = await conn.query(sql1, [cartid,productid]); 
            console.log(result1.rows[0]);
            if(typeof result1.rows[0] === 'undefined'){
                console.log("yes1");
                const sql = 'INSERT INTO cartItems (cart_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *';
                const result = await conn.query(sql, [cartid,productid,quantity]);
                conn.release;
                logging.log('info',"successfully adding produt to cart in model");
                return result.rows[0];
            }
            else{
                console.log("yes2");
                const sql = 'UPDATE cartitems SET quantity=($1) WHERE cart_id=($2) AND product_id=($3) RETURNING *';
                const result = await conn.query(sql, [result1.rows[0].quantity+1,cartid,productid]);
                conn.release;
                logging.log('info',"successfully adding produt to cart in model");
                return result.rows[0];
            }
        }
        catch(err){
            logging.log('error',"error adding product to cart in model");
            throw new Error(`adding product to cart error in model: ${err}`);
        }
    }
    async delete(cartid:number,productid:number):Promise<cartItem>{
        try{
            const conn = await client.connect();
            const sql = 'DELETE FROM cartItems WHERE cart_id=($1) AND product_id=($2) RETURNING *';
            const result = await conn.query(sql, [cartid,productid]);
            conn.release;
            logging.log('info',"successfully removing produt from cart in model");
            return result.rows[0];
        }
        catch(err){
            logging.log('error',"error removing product from cart in model");
            throw new Error(`removing product from cart error in model: ${err}`);
        }
    }
    async idOfCart(id:number):Promise<number>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT id FROM cart WHERE userid=($1)';
            const result = await conn.query(sql, [id]);
            conn.release;
            logging.log('info',"successfully getting cart id in model");
            return result.rows[0].id;
        }
        catch(err){
            logging.log('error',"error getting cart id in model");
            throw new Error(`getting cart id error in model: ${err}`);
        }
    }
    async increment(cartid:number,productid:number):Promise<cartItem>{
        try{
            const conn = await client.connect();
            const sql = 'UPDATE cartItems SET quantity = quantity + ($1) WHERE cart_id=($2) AND product_id=($3) RETURNING *';
            const result = await conn.query(sql, [1,cartid,productid]);
            conn.release;
            logging.log('info',"successfully increment produt in cart in model");
            return result.rows[0];
        }
        catch(err){
            logging.log('error',"error increment product in cart in model");
            throw new Error(`increment product in cart error in model: ${err}`);
        }
    }
    async decrement(cartid:number,productid:number):Promise<cartItem>{
        try{
            const conn = await client.connect();
            const sql = 'UPDATE cartItems SET quantity = quantity - ($1) WHERE cart_id=($2) AND product_id=($3) RETURNING *';
            const result = await conn.query(sql, [1,cartid,productid]);
            conn.release;
            logging.log('info',"successfully decrement produt in cart in model");
            return result.rows[0];
        }
        catch(err){
            logging.log('error',"error decrement product in cart in model");
            throw new Error(`decrement product in cart error in model: ${err}`);
        }
    }
    async get(cartid:number):Promise<cartItems[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT cartitems.quantity,product.name,product.price,product.image FROM cartitems INNER JOIN product ON cartitems.product_id=product.id WHERE cart_id=($1);';
            const result = await conn.query(sql, [cartid]);
            conn.release;
            logging.log('info',"successfully GETTING produt from cart in model");
            return result.rows;
        }
        catch(err){
            logging.log('error',"error getting product from cart in model");
            throw new Error(`getting product from cart error in model: ${err}`);
        }
    }
}
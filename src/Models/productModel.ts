import {product} from '../Types/productType';
import client from '../Utils/database';
import logging from '../Utils/logger';


export class productModel {
    async index(num:number):Promise<product[]>{
        try{
            const conn = await client.connect();
            const sql = "select * from product order by reviews limit 3 offset ($1)";
            const result = await conn.query(sql,[num]);
            conn.release;
            return result.rows;
        }
        catch(err){
            throw new Error(`getting products error in Models: ${err}`)
        }
    }
    async get(imgName:string):Promise<number>{
        try{
            const conn = await client.connect();
            const sql = "select id from product WHERE image=($1)";
            const result = await conn.query(sql,[imgName]);
            conn.release;
            return result.rows[0].id;
        }
        catch(err){
            throw new Error(`getting products error in Models: ${err}`)
        }
    }
    async SearchBycategory(category:string):Promise<product[]>{
        try{
            const conn = await client.connect();
            const sql = "SELECT * FROM product WHERE category=($1)";
            const result = await conn.query(sql,[category]);
            conn.release;
            return result.rows;
        }catch(err){
            throw new Error(`getting products by category error in Models: ${err}`)
        }
    }
    async SearchById(id:number):Promise<product>{
        try{
            const conn = await client.connect();
            const sql = "SELECT * FROM product WHERE id=($1)";
            const result = await conn.query(sql,[id]);
            conn.release;
            return result.rows[0];
        }catch(err){
            throw new Error(`getting product by id error in Models: ${err}`)
        }
    }
    async create(name:string,price:number,quantity:number,category:string,description:string):Promise<product>{
        try{
            const conn = await client.connect();
            const sql = "INSERT INTO product (name,price,quantity,category,description,reviews) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";
            const result = await conn.query(sql,[name,price,quantity,category,description,0]);
            conn.release;
            logging.log('info',"successfully adding product by admin in models");
            return result.rows[0];
        }
        catch(err){
            logging.log('error',`error in creating product by admin in model: ${err}`);
            throw new Error(`adding product error in Models: ${err}`)
        }
    }
    async update(quantity:number,product_id:number):Promise<void>{
        try{
            const conn = await client.connect();
            const sql1 = "SELECT quantity FROM product WHERE id=($1)";
            const result1 = await conn.query(sql1,[product_id]);
            const sql = "UPDATE product SET quantity=($1) WHERE id=($2)";
            const result = await conn.query(sql,[ ((result1.rows[0].quantity)-quantity),product_id ]);
            logging.log('info',"successfully updating product in models");
            conn.release;
        }
        catch(err){
            logging.log('error',`error in updating product in the model: ${err}`);
            throw new Error(`updating product quantity error in Models: ${err}`)
        }
    }
    async saveImg(name:string,id:number):Promise<void>{
        try{
            const conn = await client.connect();
            const sql1 = "UPDATE product SET image=($1) WHERE id=($2)";
            const result = await conn.query(sql1,[name,id]);
            logging.log('info',"successfully saving image in the model");
            conn.release;
        }
        catch(err){
            logging.log('error',`error in saving image in the model: ${err}`);
            throw new Error(`updating product image error in Models: ${err}`)
        }
    }

}
import client from "../Utils/database";
import {user,userData} from '../Types/userType';
import logging from "../Utils/logger";
export class userModel {
    async create(firstName:string ,lastName:string ,password:string,username:string,email:string  ):Promise<user>{
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO Users (username,firstname,email,lastname,password) VALUES ($1,$2,$3,$4,$5) RETURNING *';
            const result = await conn.query(sql, [username,firstName,email,lastName,password]);
            conn.release;
            return result.rows[0];
        }
        catch(err){
            throw new Error(`user creation error in Models: ${err}`);
        }
    }
    async select(username:string):Promise<user>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM Users WHERE username=($1)';
            const result = await conn.query(sql, [username]);
            conn.release;
            logging.log('info',"successfully getting username in model");
            return result.rows[0];
        }
        catch(err){
            logging.log('error',`error in showing username in model: ${err}`);
            throw new Error(`user login error in Models: ${err}`);
        }
    }
    async selectUserName(id:number):Promise<user>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT username FROM Users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release;
            return result.rows[0];
        }
        catch(err){
            throw new Error(`user login error in Models: ${err}`);
        }
    }
    async show():Promise<user[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM Users';
            const result = await conn.query(sql);
            conn.release;
            return result.rows;
        }
        catch(err){
            throw new Error(`getting users error in Models: ${err}`);
        }
    }
    async getId(username:string):Promise<number>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT id FROM Users WHERE username=($1)';
            const result = await conn.query(sql,[username]);
            conn.release;
            return result.rows[0].id;
        }
        catch(err){
            throw new Error(`getting users error in Models: ${err}`);
        }
    }
    async getInfo(id:number):Promise<userData>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT email,username,image FROM Users WHERE id=($1)';
            const result = await conn.query(sql,[id]);
            conn.release;
            return result.rows[0];
        }
        catch(err){
            throw new Error(`getting users error in Models: ${err}`);
        }
    }
    async save(id:number,image:string){
        try{
            const conn = await client.connect();
            const sql = 'UPDATE users SET image=($1) WHERE id=($2)';
            const result = await conn.query(sql,[image, id]);
            conn.release;
        }
        catch(err){
            throw new Error(`saing user image error in Models: ${err}`);
        }
    }
}
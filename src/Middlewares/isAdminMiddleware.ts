import express from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import redisClient from '../Utils/redis';

dotenv.config();

export const isAdminMiddleWare = async(req:express.Request,res:express.Response,next:Function)=>{
    try {
        const username= req.cookies.username;
        const authorizationHeader = await redisClient.GET(username);
        const payload = jwt.verify(authorizationHeader as string, ((process.env.TOKEN_SECRET as unknown) as string)) as { [key: string]: any };
        if(payload.isadmin==true){
            next();
        }
        else{
            res.status(401);
            res.json('Access denied, you are not admin');
        }
    } catch (error) {
        res.status(401);
        res.json('Access denied, you are not admin');
    }
}
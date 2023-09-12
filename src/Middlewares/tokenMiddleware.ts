import express from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import redisClient from '../Utils/redis';
import {refreshTokenVlidation,createToken} from '../Controllers/userCont';

dotenv.config();

export const validateMiddleWare = async(req:express.Request,res:express.Response,next:Function)=>{
    try {
        const username= req.cookies.username;
        const authorizationHeader = await redisClient.GET(username);
        jwt.verify(authorizationHeader as string, ((process.env.TOKEN_SECRET as unknown) as string));
        next();
    } catch (error) {
        let statusCode = 401;
        let message = 'Access denied';

        if (error instanceof jwt.TokenExpiredError) {
            const refreshtoken = req.cookies.jwt;
            if (refreshtoken) {
                if (await refreshTokenVlidation(refreshtoken)) {
                    if (await createToken(req.cookies.username)) {
                        console.log("done");
                        return next();
                    }
                }
            }
        } else {
            statusCode = 401;
            message = 'Access denied, invalid token';
        }
        return res.status(statusCode).json(message);
    }
}
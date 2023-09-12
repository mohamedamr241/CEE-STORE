import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import {user,userInfo,userData} from '../Types/userType';
import {userModel} from '../Models/userModel';
import jwt from 'jsonwebtoken';
import redisClient from '../Utils/redis';
import logging from '../Utils/logger';
dotenv.config();

let userData={
    refreshtoken:'',
    username:'',
    id:''
};
export const saveData = async(obj:any)=>{
    userData=obj;
}
export const getData = async()=>{
    return userData;
}
/*                       ## CLIENT LOGIN/SIGNUP ##                                     */
export const createClientUser = async (firstName:string, lastName:string, password:string,username:string,email:string):Promise<user> =>{
    try{
        const hashedPassword = hashThePass(password);
        let userModelClass:userModel = new userModel();
        const result = userModelClass.create(firstName,lastName,hashedPassword,username,email);
        return result;
    }
    catch(err){
        throw new Error(`an error in adding user constroller: ${err}`);
    } 
}

export const loginClientUser = async (username:string, password:string):Promise<userInfo>=>{
    try{
        let userModelClass:userModel = new userModel();
        const result = await userModelClass.select(username);
        let res:userInfo;
        if(result !=null){
            if(bcrypt.compareSync(password+ (process.env.PEPPER as string), result.password)){
                const token = jwt.sign({username:result.username,firstname:result.firstname, lastname:result.lastname, isadmin:result.isadmin},((process.env.TOKEN_SECRET as unknown) as string),{ expiresIn: '30s' });
                redisClient.SET(result.username,token);
                const refresToken = jwt.sign({username:result.username, isadmin:result.isadmin},((process.env.REFRESH_TOKEN as unknown) as string),{ expiresIn: '1d' });
                res= {
                    id:result.id,
                    username:result.username,
                    firstname:result.firstname,
                    lastname:result.lastname,
                    isadmin:result.isadmin,
                    token:token,
                    refreshToke:refresToken,
                    status:'success'
                }
                logging.log('info',"successfully logging in user in controller");
                return res;
            }
        }
        res ={
            status:'login failed'
        }
        logging.log('err',"failed in logging in user in controller");
        return res;
    }
    catch(err){
        logging.log('error',`error in loggin in controller: ${err}`);
        throw new Error(`loggin in controller: ${err}`);
    }
}
const hashThePass = (password:string)=>{
    try{
        return bcrypt.hashSync(
            password + process.env.PEPPER, 
            parseInt((process.env.SALT_ROUNDS as unknown) as string)
        );
    }
    catch(err){
        throw new Error(`hasshing password in controller: ${err}`);
    }
}


/*                  ## showing All users ##                       */
export const showUsers = async ():Promise<user[]>=>{
    try{
        let userModelClass:userModel = new userModel();
        const result = userModelClass.show();   
        return result;
    }
    catch(err){
        throw new Error(`getting users error in controller: ${err}`);
    }

}

export const refreshTokenVlidation = async(refreshToken:String):Promise<boolean> =>{
    try{
        jwt.verify(refreshToken as string, ((process.env.REFRESH_TOKEN as unknown) as string));
        return true;
    }
    catch(err){
        return false;
    }
}

export const createToken = async(username:string):Promise<boolean>=>{
    try{
        let userModelClass:userModel = new userModel();
        const result = await userModelClass.select(username);
        const newtoken = jwt.sign({username:result.username,firstname:result.firstname, lastname:result.lastname, isadmin:result.isadmin},((process.env.TOKEN_SECRET as unknown) as string),{ expiresIn: '30s' });
        redisClient.SET(result.username,newtoken);
        return true;
    }
    catch(err){
        return false;
    }
}
export const getUserId = async (username:string):Promise<number>=>{
    try{
        let userModelClass:userModel = new userModel();
        const result = await userModelClass.getId(username);
        return result;
    }
    catch(err){
        throw new Error(`getting users error in controller: ${err}`);
    }
}

export const logout = async (username:string)=>{
    try{
        redisClient.DEL(username);
    }
    catch(err){
        throw new Error(`logginout user error in controller: ${err}`);
    }
}

export const userInfoData = async(id:number):Promise<userData>=>{
    try{
        let userModelClass:userModel = new userModel();
        const result = await userModelClass.getInfo(id);
        return result;
    }
    catch(err){
        throw new Error(`getting userinfo error in controller: ${err}`);
    }
}
export const saveImage = async(id:number,image:string):Promise<void>=>{
    try{
        let userModelClass:userModel = new userModel();
        await userModelClass.save(id,image);
    }
    catch(err){
        throw new Error(`saving user image error in controller: ${err}`);
    }
}
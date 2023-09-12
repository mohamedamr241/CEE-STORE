import {product} from '../Types/productType';
import {productModel} from '../Models/productModel';
import * as fs from 'fs';
import path from 'path';
import logging from '../Utils/logger';

export const getAllProducts = async (num:number):Promise<product[]> =>{
    try{
        let productMod:productModel = new productModel();
        const result=await productMod.index(num);
        return result;
    }
    catch(err){
        throw new Error(`getting products error in controller: ${err}`);
    }
}

export const getAllProductsByCategory = async (category:string)=>{
    try{
        let productMod:productModel = new productModel();
        const result = await productMod.SearchBycategory(category);
        return result;
    }
    catch(err){
        throw new Error(`getting products by category error in controller: ${err}`);
    }
}

export const AddProductByAdmin = async(name:string,price:number,quantity:number,category:string,description:string):Promise<product>=>{
    try{
        let productMod:productModel = new productModel();
        const result = await productMod.create(name,price,quantity,category,description);
        logging.log('info',"successfully adding product by admin in controller");
        return result;
    }
    catch(err){
        logging.log('error',`error in adding product by admin in controller: ${err}`);
        throw new Error(`adding product error in controller: ${err}`);
    }
}

export const saveImageName = async(name:string,id:number)=>{
    try{
        let productMod:productModel = new productModel();
        await productMod.saveImg(name,id);
        logging.log('info',"successfully saving image of product added in controller");
    }
    catch(err){
        logging.log('error',`error in saving image of product added in controller: ${err}`);
        throw new Error(`saving image error in controller: ${err}`);
    }
}
export const getIdOfProduct = async (imgName:string):Promise<number> =>{
    try{
        let productMod:productModel = new productModel();
        const result=await productMod.get(imgName);
        return result;
    }
    catch(err){
        throw new Error(`getting products error in controller: ${err}`);
    }
}

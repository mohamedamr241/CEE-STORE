import express from 'express';
import {getAllProducts,getAllProductsByCategory,AddProductByAdmin,saveImageName,getIdOfProduct} from '../Controllers/productCont';
import {validateMiddleWare} from '../Middlewares/tokenMiddleware';
import {isAdminMiddleWare} from '../Middlewares/isAdminMiddleware';
import multer from 'multer';
import path from 'path';
import logging from '../Utils/logger';

let uploadedFilename:string = '';
let productId:number;
const productRouter=express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'productImages/'); // Specify the folder where you want to save the files
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file (you can modify this logic)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      uploadedFilename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
      cb(null, uploadedFilename);
    }
});
const upload = multer({ storage: storage });

productRouter.post('/all',async (req:express.Request,res:express.Response)=>{
    try{
        const num = (req.body.num) as unknown as number;
        const result = await getAllProducts((num-1)*3);
        res.json({
            status:'success',
            data:{...result},
            message:'Here are 3 products'
        });
    }
    catch(err){
        res.status(400).send('error in getting products routes');
    } 
});

productRouter.post('/search/category',async (req:express.Request,res:express.Response)=>{
    try{
        const category = (req.body.category).toLowerCase();
        const result = await getAllProductsByCategory(category);
        res.json({
            status:'success',
            data:{...result},
            message:'Here are all products'
        });
    }
    catch(err){
        res.status(400).send('error in adding user routes');
    } 
});

productRouter.post('/create',validateMiddleWare,isAdminMiddleWare,async (req:express.Request,res:express.Response)=>{
    try{
        const name =req.body.name;
        const price=req.body.price;
        const quantity=req.body.quantity;
        const description=req.body.description;
        const category = (req.body.category).toLowerCase();
        const result = await AddProductByAdmin(name,price,quantity,category,description);
        productId = (result.id as unknown as number);
        logging.log('info',"successfully adding product routes");
        res.json({
            status:'success',
            data:{result},
            message:'Here are all products'
        });
    }
    catch(err){
        logging.log('error',`error in adding product routes: ${err}`);
        res.status(400).send('error in adding product routes');
    } 
});
productRouter.post('/upload', upload.single('image'), async(req:express.Request, res:express.Response) => {
    try{
        await saveImageName(uploadedFilename,productId);
        logging.log('info',"successfully adding image of product route");
        res.status(200).send('File uploaded successfully.');

    }
    catch(err){
        logging.log('error',`image error route: ${err}`);
        res.status(404).send('image err');
    }
});
productRouter.post('/getProductId',validateMiddleWare,async (req:express.Request,res:express.Response)=>{
    try{
        const imgName = req.body.img;
        const result = await getIdOfProduct(imgName);
        res.json({
            status:'success',
            data:{result},
            message:'Here is product'
        });
    }
    catch(err){
        res.send(404).send(`getting product id error in `)
    }
})
export default productRouter;
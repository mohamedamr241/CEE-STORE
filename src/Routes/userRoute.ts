import express from 'express';
import {showUsers,saveImage} from '../Controllers/userCont';
import {validateMiddleWare} from '../Middlewares/tokenMiddleware';
import {isAdminMiddleWare} from '../Middlewares/isAdminMiddleware';
import {createClientUser,loginClientUser,logout,userInfoData} from '../Controllers/userCont';
import cookieParser from 'cookie-parser';
import logging from '../Utils/logger';
import multer from 'multer';
import path from 'path';

let uploadedFilename:string = '';
const UserRouter = express();
UserRouter.use(cookieParser());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'userImages/'); // Specify the folder where you want to save the files
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file (you can modify this logic)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      uploadedFilename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
      cb(null, uploadedFilename);
    }
});
const upload = multer({ storage: storage });

/*                       ## CLIENT LOGIN/SIGNUP ##                                               */
UserRouter.post('/signUp',async (req:express.Request,res:express.Response)=>{
    try{
        const firstName = req.body.firstname;
        const lastName = req.body.lastname;
        const password = req.body.password;
        const username = req.body.username;
        const email = req.body.email;
        const result = await createClientUser(firstName,lastName,password,username,email);
        logging.log('info',"successfully add user route ");
        res.json({
            status:'success',
            data:{result},
            message:'User added successfully'
        })
    }
    catch(err){
        logging.log('error',`error in adding user routes: ${err}`);
        res.status(400).send('error in adding user routes');
    }
});
UserRouter.post('/logIn',async  (req:express.Request,res:express.Response)=>{
    try{
        const username= req.body.username;
        const password= req.body.password;
        const result = await loginClientUser(username,password);
        if(result.status== "login failed"){
            logging.log('error',"login failed routes");
            res.status(401);
            res.json({
                status: 'failed',
                message: result,
            });
        }
        else{
            res.cookie("jwt", result.refreshToke,{
                maxAge:24 * 60 * 60 * 1000,
                httpOnly:true,
                //secure:true  can't use it because the back end is not deployed so it is http not https
            })
            res.cookie("username",result.username);
            res.cookie("id",result.id);
            logging.log('info',"successfully login user route ");
            logging.log('info',"---------------------------------");
            res.json({
                status:200,
                data:{
                    "username": result.username,
                    "firstname": result.firstname,
                    "lastname": result.lastname,
                    "isadmin": result.isadmin,
                },
                message:'login successfully'
            })
        }
    }
    catch(err){
        logging.log('error',`error in signin user routes: ${err}`);
        res.status(400).send('error in signin user routes');
    }
});

/*                  ## showing All users ##                       */
UserRouter.get('/AllUsers',isAdminMiddleWare,validateMiddleWare,async (req:express.Request,res:express.Response)=>{
    try{
        const result = await showUsers();
        logging.log('info',"successfully getting all user route ");
        res.json({
            status:'success',
            data:{...result},
            message:'admin task is done successfully'
        })
    }
    catch(err){
        logging.log('error',`failed in getting user route: ${err}`);
        res.status(400).send('error in signin user routes');
    }
});
UserRouter.get('/logout',async (req:express.Request,res:express.Response)=>{
    try{
        await logout(req.cookies.username);
        res.clearCookie('jwt', { path: '/' });
        res.clearCookie('username', { path: '/' });
        res.json({
            status:200,
            data:"done"
        });
    }
    catch(err){
        logging.log('error',`error in logging out user route: ${err}`);
        res.status(400).send('error in logging out');
    }
});


UserRouter.get('/userInfo',validateMiddleWare,async (req:express.Request,res:express.Response)=>{
    try{
        const id = req.cookies.id;
        const result = await userInfoData(id);
        logging.log('info',"successfully getting user info route ");
        res.json({
            status:'success',
            data:{result},
            message:'admin task is done successfully'
        })
    }
    catch(err){
        logging.log('error',`failed in getting user info route: ${err}`);
        res.status(400).send('error in signin user info routes');
    }
});
UserRouter.post('/uploadImage', upload.single('image'),async (req:express.Request, res:express.Response)=>{
    try{
        const id = req.cookies.id;
        await saveImage(id,uploadedFilename);
        res.json({
            status:'success',
            data:{uploadedFilename},
            message:'image is uploaded successfully'
        })
    }
    catch(err){
        res.status(400).send('error in uploading user image routes');
    }
})



export default UserRouter;

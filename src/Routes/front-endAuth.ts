import express from 'express';
import path from 'path';

const FrontRouterAuth = express();

FrontRouterAuth.set("views",path.join(__dirname, "../../front-end/Login-signup"));
FrontRouterAuth.set("view engine","ejs");
FrontRouterAuth.use(express.static(path.join(__dirname, "../../front-end/Login-signup")));

FrontRouterAuth.get('/login',(req:express.Request,res:express.Response)=>{
    try{
        const message = req.flash('failed');
        res.render('login',{message:message[0]});
    }
    catch(err){
        res.status(404).send('login page is not found');
    }
});
FrontRouterAuth.get('/signup',(req:express.Request,res:express.Response)=>{
    try{
        const message = req.flash('failed');
        res.render('signup',{message:message[0]});
         
    }
    catch(err){
        res.status(404).send('signup page is not found');
    }
});

export default FrontRouterAuth;
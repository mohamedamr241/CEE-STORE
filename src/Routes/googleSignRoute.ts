import express from 'express';
import passport from 'passport';
import { getData } from '../Controllers/userCont';

const googleRouter = express();

googleRouter.get('/google/signin', passport.authenticate('google-signin', { scope: ['profile', 'email'] }));
googleRouter.get(
  '/google/signin/callback',
  passport.authenticate('google-signin'),
  async (req, res) => {
    try{
      const responseMessage:any=req.authInfo;
      if (responseMessage.message == "hello") {
        let obj = await getData();
        res.cookie("jwt", obj.refreshtoken,{
          maxAge:24 * 60 * 60 * 1000,
          httpOnly:true,
        })
        res.cookie("username",obj.username);
        res.cookie("id",obj.id);
        res.redirect('/main/home');
      }
      else{
        req.flash('failed','This account does not exist, Sign up first');
        res.redirect('/main/signup');
      }
    }
    catch(err){
      res.status(400).send('error in sigining in with google');
    }
  }
);
googleRouter.get('/google/signup', passport.authenticate('google-signup', { scope: ['profile', 'email'] }));
googleRouter.get(
  '/google/signup/callback',
  passport.authenticate('google-signup'),
  async (req, res) => {
    try{
      const responseMessage:any=req.authInfo;
      if (responseMessage.message == "hello") {
        let obj = await getData();
        res.cookie("jwt", obj.refreshtoken,{
          maxAge:24 * 60 * 60 * 1000,
          httpOnly:true,
        })
        res.cookie("username",obj.username);
        res.cookie("id",obj.id);
        res.redirect('/main/home');
      }
      else{
        req.flash('failed','This account already exists, Sign in');
        res.redirect('/main/login');
      }
    }
    catch(err){
      res.status(400).send('error in sigining up with google');
    }
  }
);

export default googleRouter;
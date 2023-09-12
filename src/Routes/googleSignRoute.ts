import express from 'express';
import passport from 'passport';
import obj from '../Utils/google';
import { getData } from '../Controllers/userCont';

const googleRouter = express();

googleRouter.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
googleRouter.get(
    "/google",
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
  );
googleRouter.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/main/login' }), async(req, res) => {
  try{
    let obj = await getData();
    res.cookie("jwt", obj.refreshtoken,{
      maxAge:24 * 60 * 60 * 1000,
      httpOnly:true,
    })
    res.cookie("username",obj.username);
    res.cookie("id",obj.id);
    res.redirect('/main/home');
  }
  catch(err){
    res.status(400).send('error in sigining in with google');
  }
});
export default googleRouter;
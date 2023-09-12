import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import dotenv from 'dotenv';
import {createClientUser,loginClientUser} from '../Controllers/userCont';
import {addCart} from '../Controllers/cartCont';
import {saveData} from '../Controllers/userCont';

const GoogleStrategy = passportGoogle.Strategy;
dotenv.config();
let obj={
  refreshtoken:'',
  username:'',
  id:''
};
passport.use(
    new GoogleStrategy(
      {
        clientID: (process.env.GOOGLE_CLIENT_ID as string),
        clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string),
        callbackURL: "http://localhost:8000/auth/google/redirect",
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        const email = profile.emails[0].value;
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const parts = email.split('@');
        const username = parts[0];
        const demopassword = (profile.id+profile.displayName);
        const password = demopassword.replace(/\s/g, '');

        const result = await loginClientUser(username,password);
        if(result.status== "login failed"){
          const signupuser = await createClientUser(firstName,lastName,password,username,email);
          const cart = await addCart(signupuser.id);
          const result2 = await loginClientUser(username,password);
          obj = {
            refreshtoken: (result2.refreshToke as string),
            username: (result2.username as string),
            id: (result2.id as unknown as string)
          }
          saveData(obj);
        }
        else{
          obj = {
            refreshtoken: (result.refreshToke as string),
            username: (result.username as string),
            id: (result.id as unknown as string)
          }
          saveData(obj);
        }
        
        done(null,profile);
      }
    )
);
export default obj;
passport.serializeUser((user:any,done)=>{
    done(null,user.displayName);
})
passport.deserializeUser((user:any,done)=>{
    return done(null,user);
})
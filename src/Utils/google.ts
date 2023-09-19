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
  'google-signup',
  new GoogleStrategy(
    {
      clientID: (process.env.GOOGLE_CLIENT_ID_SIGN_UP as string),
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET_SIGN_UP as string),
      callbackURL: 'http://localhost:8000/auth/google/signup/callback', // Adjust this to your callback URL for sign-up
    },
    async (accessToken, refreshToken, profile:any, done) => {
          const email = profile.emails[0].value;
          const firstName = profile.name.givenName;
          const lastName = profile.name.familyName;
          const parts = email.split('@');
          const username = parts[0];
          const demopassword = (profile.id+profile.displayName);
          const password = demopassword.replace(/\s/g, '');
          const signupuser = await createClientUser(firstName,lastName,password,username,email);
          if(signupuser!= null){
            const cart = await addCart(signupuser.id);
            const result2 = await loginClientUser(username,password);
            obj = {
              refreshtoken: (result2.refreshToke as string),
              username: (result2.username as string),
              id: (result2.id as unknown as string)
            }
            saveData(obj);
            done(null,profile,{message:'hello'});
          }
          else{
            done(null,profile,{message:'account already exist'});
          }
    }
  )
);
passport.use(
  'google-signin',
  new GoogleStrategy(
    {
      clientID: (process.env.GOOGLE_CLIENT_ID_SIGN_IN as string),
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET_SIGN_IN as string),
      callbackURL: 'http://localhost:8000/auth/google/signin/callback', // Adjust this to your callback URL for sign-in
    },
    async (accessToken:any, refreshToken:any, profile:any, done:any) => {
        const email = profile.emails[0].value;
        const parts = email.split('@');
        const username = parts[0];
        const demopassword = (profile.id+profile.displayName);
        const password = demopassword.replace(/\s/g, '');

        const result = await loginClientUser(username,password);
        if(result.status== "login failed"){
          console.log('hello');
          return done(null, profile, { message: 'Login failed. Please try again.' }); 
        }
        else{
          obj = {
            refreshtoken: (result.refreshToke as string),
            username: (result.username as string),
            id: (result.id as unknown as string)
          }
          saveData(obj);
          done(null,profile,{message:'hello'});
        }
    }
  )
);
passport.serializeUser((user:any,done)=>{
    done(null,user.displayName);
})
passport.deserializeUser((user:any,done)=>{
    return done(null,user);
})
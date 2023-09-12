import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import UserRouter from './Routes/userRoute';
import productRouter from './Routes/productRoute';
import orderRouter from './Routes/orderRoute';
import FrontRouter from './Routes/front-end';
import FrontRouterAuth from './Routes/front-endAuth';
import cookieParser from 'cookie-parser';
import FrontAdminRouter from './Routes/front-endAdmin';
import imagesRouter from './Routes/imagesRoute';
import cartRouter from './Routes/cartRoute';
import userimagesRouter from './Routes/userimageRoute';
import emailRouter from './Routes/emailRoute';
import emailimagesRouter from './Routes/emailImagesRoute';
import './Utils/google';
import googleRouter from './Routes/googleSignRoute';
import passport from 'passport';
import session from "express-session";

const app:express.Application = express();
const port:number = 8000;
const host:string = 'localhost';
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true  }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(
  session({
    secret: "your-secret-key", // Change this to a secret key for session encryption
  })
);
app.use(passport.initialize());
app.use(passport.session());
// start cors

app.use('/main',FrontRouter);
app.use('/admin',FrontAdminRouter);
app.use('/main',FrontRouterAuth);
app.use('/user',UserRouter);
app.use('/product',productRouter);
app.use('/order',orderRouter);
app.use('/images',imagesRouter);
app.use('/cart',cartRouter);
app.use('/',userimagesRouter);
app.use('/email',emailRouter);
app.use('/',emailimagesRouter);
app.use('/auth',googleRouter);

app.listen(port, listening);
function listening() {
  console.log(`server running on localhost: ${port}`);
  console.log(`Server is running on http://${host}:${port}/main/login`);
}
export default app;

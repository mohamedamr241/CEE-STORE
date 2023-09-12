import express from 'express';
import { validateMiddleWare } from '../Middlewares/tokenMiddleware';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
import { userInfoData } from '../Controllers/userCont';

dotenv.config();
const emailRouter = express();


emailRouter.post('/send',validateMiddleWare, async(req:express.Request,res:express.Response)=>{
    try{
        const fullname = req.body.fullname;
        const email = req.body.email;
        const subject = req.body.subject;
        const message = req.body.message;
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            },
        });
        const msg = {
            from: `${process.env.EMAIL}`, // sender address
            to: `${email}`, // list of receivers
            subject: `${subject}`, // Subject line
            text: `${message}`, // plain text body
            html: `<!-- THIS EMAIL WAS BUILT AND TESTED WITH LITMUS http://litmus.com -->
            <!-- IT WAS RELEASED UNDER THE MIT LICENSE https://opensource.org/licenses/MIT -->
            <!-- QUESTIONS? TWEET US @LITMUSAPP -->
            <!doctype html>
            <html>
              <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <style type="text/css">
                  /* FONTS */
                  @media screen {
                    @font-face {
                      font-family: "Lato";
                      font-style: normal;
                      font-weight: 400;
                      src:
                        local("Lato Regular"),
                        local("Lato-Regular"),
                        url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff)
                          format("woff");
                    }
            
                    @font-face {
                      font-family: "Lato";
                      font-style: normal;
                      font-weight: 700;
                      src:
                        local("Lato Bold"),
                        local("Lato-Bold"),
                        url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff)
                          format("woff");
                    }
            
                    @font-face {
                      font-family: "Lato";
                      font-style: italic;
                      font-weight: 400;
                      src:
                        local("Lato Italic"),
                        local("Lato-Italic"),
                        url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff)
                          format("woff");
                    }
            
                    @font-face {
                      font-family: "Lato";
                      font-style: italic;
                      font-weight: 700;
                      src:
                        local("Lato Bold Italic"),
                        local("Lato-BoldItalic"),
                        url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff)
                          format("woff");
                    }
                  }
            
                  /* CLIENT-SPECIFIC STYLES */
                  body,
                  table,
                  td,
                  a {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                  }
                  table,
                  td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                  }
                  img {
                    -ms-interpolation-mode: bicubic;
                  }
            
                  /* RESET STYLES */
                  img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                  }
                  table {
                    border-collapse: collapse !important;
                  }
                  body {
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100% !important;
                  }
            
                  /* iOS BLUE LINKS */
                  a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                  }
            
                  /* MOBILE STYLES */
                  @media screen and (max-width: 600px) {
                    h1 {
                      font-size: 32px !important;
                      line-height: 32px !important;
                    }
                  }
            
                  /* ANDROID CENTER FIX */
                  div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                  }
                </style>
              </head>
              <body
                style="
                  background-color: #f4f4f4;
                  margin: 0 !important;
                  padding: 0 !important;
                "
              >
                <!-- HIDDEN PREHEADER TEXT -->
                <div
                  style="
                    display: none;
                    font-size: 1px;
                    color: #fefefe;
                    line-height: 1px;
                    font-family: Helvetica, Arial, sans-serif;
                    max-height: 0px;
                    max-width: 0px;
                    opacity: 0;
                    overflow: hidden;
                  "
                >
                  We're sorry to see you go. We'll still be here if you ever want to reopen
                  your account.
                </div>
            
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <!-- LOGO -->
                  <tr>
                    <td bgcolor="#f33f3f" align="center">
                      <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                        <tr>
                        <td align="center" valign="top" width="600">
                        <![endif]-->
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px"
                      >
                        <tr>
                          <td
                            align="center"
                            valign="top"
                            style="padding: 40px 10px 40px 10px"
                          >
                            <a href="http://litmus.com" target="_blank">
                              <img
                                alt="Logo"
                                src="http://litmuswww.s3.amazonaws.com/community/template-gallery/ceej/logo.png"
                                width="40"
                                height="40"
                                style="
                                  display: block;
                                  width: 40px;
                                  max-width: 40px;
                                  min-width: 40px;
                                  font-family: Helvetica, Arial, sans-serif;
                                  color: #ffffff;
                                  font-size: 18px;
                                "
                                border="0"
                              />
                            </a>
                          </td>
                        </tr>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                  </tr>
                  <!-- HERO -->
                  <tr>
                    <td bgcolor="#f33f3f" align="center" style="padding: 0px 10px 0px 10px">
                      <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                        <tr>
                        <td align="center" valign="top" width="600">
                        <![endif]-->
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px"
                      >
                        <tr>
                          <td
                            bgcolor="#ffffff"
                            align="center"
                            valign="top"
                            style="
                              padding: 40px 20px 20px 20px;
                              border-radius: 4px 4px 0px 0px;
                              color: #111111;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 48px;
                              font-weight: 400;
                              letter-spacing: 4px;
                              line-height: 48px;
                            "
                          >
                            <h1 style="font-size: 48px; font-weight: 400; margin: 0">
                              We understand.
                            </h1>
                          </td>
                        </tr>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                  </tr>
                  <!-- COPY BLOCK -->
                  <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                      <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                        <tr>
                        <td align="center" valign="top" width="600">
                        <![endif]-->
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px"
                      >
                        <!-- COPY -->
                        <tr>
                          <td
                            bgcolor="#ffffff"
                            align="left"
                            style="
                              padding: 20px 30px 40px 30px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 18px;
                              font-weight: 400;
                              line-height: 25px;
                            "
                          >
                            <p id="message" style="margin: 0">
                              ${message}
                            </p>
                          </td>
                        </tr>
                        <!-- COPY -->
                        <tr>
                          <td
                            bgcolor="#ffffff"
                            align="left"
                            style="
                              padding: 0px 30px 40px 30px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 18px;
                              font-weight: 400;
                              line-height: 25px;
                            "
                          >
                            <p style="margin: 0">
                              Although we're sad to see you go, we're here if you want to
                              complain about anything. We are happy to help ${fullname} :)
                            </p>
                          </td>
                        </tr>
                        <!-- BULLETPROOF BUTTON -->
                        <tr>
                          <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td
                                  bgcolor="#ffffff"
                                  align="center"
                                  style="padding: 20px 30px 60px 30px"
                                >
                                  <table border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                      <td
                                        align="center"
                                        style="border-radius: 3px"
                                        bgcolor="#66BB7F"
                                      ></td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                  </tr>
                  <!-- COPY CALLOUT -->
                  <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                      <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                        <tr>
                        <td align="center" valign="top" width="600">
                        <![endif]-->
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px"
                      >
                        <!-- HEADLINE -->
                        <tr>
                          <td
                            bgcolor="#111111"
                            align="left"
                            style="
                              padding: 40px 30px 20px 30px;
                              color: #ffffff;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 18px;
                              font-weight: 400;
                              line-height: 25px;
                            "
                          >
                            <h2 style="font-size: 24px; font-weight: 400; margin: 0">
                              Notify Your Users
                            </h2>
                          </td>
                        </tr>
                        <!-- COPY -->
                        <tr>
                          <td
                            bgcolor="#111111"
                            align="left"
                            style="
                              padding: 0px 30px 20px 30px;
                              color: #aeaeae;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 18px;
                              font-weight: 400;
                              line-height: 25px;
                            "
                          >
                            <p style="margin: 0">
                              We noticed there are other users on your account. Let them
                              know that they'll lose access soon.
                            </p>
                          </td>
                        </tr>
                        <!-- COPY -->
                        <tr>
                          <td
                            bgcolor="#111111"
                            align="left"
                            style="
                              padding: 0px 30px 40px 30px;
                              border-radius: 0px 0px 4px 4px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 18px;
                              font-weight: 400;
                              line-height: 25px;
                            "
                          >
                            <p style="margin: 0">
                              <a
                                href="http://litmus.com"
                                target="_blank"
                                style="color: #ffffff"
                                >Spread the word</a
                              >
                            </p>
                          </td>
                        </tr>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                  </tr>
                  <!-- SUPPORT CALLOUT -->
                  <tr>
                    <td
                      bgcolor="#f4f4f4"
                      align="center"
                      style="padding: 30px 10px 0px 10px"
                    >
                      <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                        <tr>
                        <td align="center" valign="top" width="600">
                        <![endif]-->
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px"
                      >
                        <!-- HEADLINE -->
                        <tr>
                          <td
                            bgcolor="#e37878"
                            align="center"
                            style="
                              padding: 30px 30px 30px 30px;
                              border-radius: 4px 4px 4px 4px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 18px;
                              font-weight: 400;
                              line-height: 25px;
                            "
                          >
                            <h2
                              style="
                                font-size: 20px;
                                font-weight: 400;
                                color: #111111;
                                margin: 0;
                              "
                            >
                              Need more help?
                            </h2>
                            <p style="margin: 0">
                              <a
                                href="http://litmus.com"
                                target="_blank"
                                style="color: #000000"
                                >We&rsquo;re here, ready to talk</a
                              >
                            </p>
                          </td>
                        </tr>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                  </tr>
                  <!-- FOOTER -->
                  <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                      <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                        <tr>
                        <td align="center" valign="top" width="600">
                        <![endif]-->
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px"
                      >
                        <!-- NAVIGATION -->
                        <tr>
                          <td
                            bgcolor="#f4f4f4"
                            align="left"
                            style="
                              padding: 30px 30px 30px 30px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              font-weight: 400;
                              line-height: 18px;
                            "
                          >
                            <p style="margin: 0">
                              <a
                                href="http://litmus.com"
                                target="_blank"
                                style="color: #111111; font-weight: 700"
                                >Dashboard</a
                              >
                              -
                              <a
                                href="http://litmus.com"
                                target="_blank"
                                style="color: #111111; font-weight: 700"
                                >Billing</a
                              >
                              -
                              <a
                                href="http://litmus.com"
                                target="_blank"
                                style="color: #111111; font-weight: 700"
                                >Help</a
                              >
                            </p>
                          </td>
                        </tr>
                        <!-- PERMISSION REMINDER -->
                        <tr>
                          <td
                            bgcolor="#f4f4f4"
                            align="left"
                            style="
                              padding: 0px 30px 30px 30px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              font-weight: 400;
                              line-height: 18px;
                            "
                          >
                            <p style="margin: 0">
                              You received this email because you canceled your account. If
                              it looks weird,
                              <a
                                href="http://litmus.com"
                                target="_blank"
                                style="color: #111111; font-weight: 700"
                                >view it in your browser</a
                              >.
                            </p>
                          </td>
                        </tr>
                        <!-- UNSUBSCRIBE -->
                        <tr>
                          <td
                            bgcolor="#f4f4f4"
                            align="left"
                            style="
                              padding: 0px 30px 30px 30px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              font-weight: 400;
                              line-height: 18px;
                            "
                          >
                            <p style="margin: 0">
                              If these emails get annoying, please feel free to
                              <a
                                href="http://litmus.com"
                                target="_blank"
                                style="color: #111111; font-weight: 700"
                                >unsubscribe</a
                              >.
                            </p>
                          </td>
                        </tr>
                        <!-- ADDRESS -->
                        <tr>
                          <td
                            bgcolor="#f4f4f4"
                            align="left"
                            style="
                              padding: 0px 30px 30px 30px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              font-weight: 400;
                              line-height: 18px;
                            "
                          >
                            <p style="margin: 0">
                              Ceej - 1234 Main Street - Anywhere, MA - 56789
                            </p>
                          </td>
                        </tr>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                  </tr>
                </table>
              </body>
            </html>
            `, // html body
        }
        const info = await transporter.sendMail(msg);
        res.send('success')
    }
    catch(err){
        res.status(404).send(`sending email error in route: ${err}`)
    }
});

emailRouter.post('/signup', async(req:express.Request,res:express.Response)=>{
    try{
        const username = req.body.username;
        const email = req.body.email;
        const subject = 'Welcome to CEE STORE - Your New Shopping Adventure Begins Now!';

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            },
        });
        const msg = {
            from: `${process.env.EMAIL}`, // sender address
            to: `${email}`, // list of receivers
            subject: `${subject}`, // Subject line
            html: `<!-- THIS EMAIL WAS BUILT AND TESTED WITH LITMUS http://litmus.com -->
            <!-- IT WAS RELEASED UNDER THE MIT LICENSE https://opensource.org/licenses/MIT -->
            <!-- QUESTIONS? TWEET US @LITMUSAPP -->
            <!doctype html>
            <html>
              <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <style type="text/css">
                  /* FONTS */
                  @media screen {
                    @font-face {
                      font-family: "Lato";
                      font-style: normal;
                      font-weight: 400;
                      src:
                        local("Lato Regular"),
                        local("Lato-Regular"),
                        url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff)
                          format("woff");
                    }
            
                    @font-face {
                      font-family: "Lato";
                      font-style: normal;
                      font-weight: 700;
                      src:
                        local("Lato Bold"),
                        local("Lato-Bold"),
                        url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff)
                          format("woff");
                    }
            
                    @font-face {
                      font-family: "Lato";
                      font-style: italic;
                      font-weight: 400;
                      src:
                        local("Lato Italic"),
                        local("Lato-Italic"),
                        url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff)
                          format("woff");
                    }
            
                    @font-face {
                      font-family: "Lato";
                      font-style: italic;
                      font-weight: 700;
                      src:
                        local("Lato Bold Italic"),
                        local("Lato-BoldItalic"),
                        url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff)
                          format("woff");
                    }
                  }
            
                  /* CLIENT-SPECIFIC STYLES */
                  body,
                  table,
                  td,
                  a {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                  }
                  table,
                  td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                  }
                  img {
                    -ms-interpolation-mode: bicubic;
                  }
            
                  /* RESET STYLES */
                  img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                  }
                  table {
                    border-collapse: collapse !important;
                  }
                  body {
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100% !important;
                  }
            
                  /* iOS BLUE LINKS */
                  a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                  }
            
                  /* MOBILE STYLES */
                  @media screen and (max-width: 600px) {
                    h1 {
                      font-size: 32px !important;
                      line-height: 32px !important;
                    }
                  }
            
                  /* ANDROID CENTER FIX */
                  div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                  }
                </style>
              </head>
              <body
                style="
                  background-color: #f4f4f4;
                  margin: 0 !important;
                  padding: 0 !important;
                "
              >
                <!-- HIDDEN PREHEADER TEXT -->
                <div
                  style="
                    display: none;
                    font-size: 1px;
                    color: #fefefe;
                    line-height: 1px;
                    font-family: Helvetica, Arial, sans-serif;
                    max-height: 0px;
                    max-width: 0px;
                    opacity: 0;
                    overflow: hidden;
                  "
                >
                  We're thrilled to have you here! Get ready to dive into your new account.
                </div>
            
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <!-- LOGO -->
                  <tr>
                    <td bgcolor="#f33f3f" align="center">
                      <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                        <tr>
                        <td align="center" valign="top" width="600">
                        <![endif]-->
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px"
                      >
                        <tr>
                          <td
                            align="center"
                            valign="top"
                            style="padding: 40px 10px 40px 10px"
                          >
                            <a href="http://litmus.com" target="_blank">
                              <img
                                alt="Logo"
                                src="http://litmuswww.s3.amazonaws.com/community/template-gallery/ceej/logo.png"
                                width="40"
                                height="40"
                                style="
                                  display: block;
                                  width: 40px;
                                  max-width: 40px;
                                  min-width: 40px;
                                  font-family: Helvetica, Arial, sans-serif;
                                  color: #ffffff;
                                  font-size: 18px;
                                "
                                border="0"
                              />
                            </a>
                          </td>
                        </tr>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                  </tr>
                  <!-- HERO -->
                  <tr>
                    <td bgcolor="#f33f3f" align="center" style="padding: 0px 10px 0px 10px">
                      <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                        <tr>
                        <td align="center" valign="top" width="600">
                        <![endif]-->
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px"
                      >
                        <tr>
                          <td
                            bgcolor="#ffffff"
                            align="center"
                            valign="top"
                            style="
                              padding: 40px 20px 20px 20px;
                              border-radius: 4px 4px 0px 0px;
                              color: #111111;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 48px;
                              font-weight: 400;
                              letter-spacing: 4px;
                              line-height: 48px;
                            "
                          >
                            <h1 style="font-size: 48px; font-weight: 400; margin: 0">
                              Welcome!
                            </h1>
                          </td>
                        </tr>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                  </tr>
                  <!-- COPY BLOCK -->
                  <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                      <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                        <tr>
                        <td align="center" valign="top" width="600">
                        <![endif]-->
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px"
                      >
                        <!-- COPY -->
                        <tr>
                          <td
                            bgcolor="#ffffff"
                            align="left"
                            style="
                              padding: 20px 30px 40px 30px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 18px;
                              font-weight: 400;
                              line-height: 25px;
                            "
                          >
                            <p style="margin: 0">
                              Welcome ${username} to CEE STORE, your gateway to a world of incredible
                              products and exceptional shopping experiences. We're thrilled
                              to have you on board, and we can't wait to make your shopping
                              journey with us truly special. Get ready for a fantastic ride
                              filled with exclusive deals, top-notch customer service, and a
                              curated selection of products just for you. Thank you for
                              choosing CEE STORE; your satisfaction is our priority.
                            </p>
                          </td>
                        </tr>
                        <!-- BULLETPROOF BUTTON -->
                        <tr>
                          <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td
                                  bgcolor="#ffffff"
                                  align="center"
                                  style="padding: 20px 30px 60px 30px"
                                >
                                  <table border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                      <td
                                        align="center"
                                        style="border-radius: 3px"
                                        bgcolor="#000000"
                                      >
                                        <a
                                          href="https://litmus.com"
                                          target="_blank"
                                          style="
                                            font-size: 20px;
                                            font-family: Helvetica, Arial, sans-serif;
                                            color: #ffffff;
                                            text-decoration: none;
                                            color: #ffffff;
                                            text-decoration: none;
                                            padding: 15px 25px;
                                            border-radius: 2px;
                                            border: 1px solid #000000;
                                            display: inline-block;
                                          "
                                          >Confirm Account</a
                                        >
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <!-- COPY -->
                        <tr>
                          <td
                            bgcolor="#ffffff"
                            align="left"
                            style="
                              padding: 0px 30px 0px 30px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-weight: 400;
                              line-height: 25px;
                            "
                          >
                            <p style="margin: 0">
                              If that doesn't work, copy and paste the following link in
                              your browser:
                            </p>
                          </td>
                        </tr>
                        <!-- COPY -->
                        <tr>
                          <td
                            bgcolor="#ffffff"
                            align="left"
                            style="
                              padding: 20px 30px 20px 30px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 18px;
                              font-weight: 400;
                              line-height: 25px;
                            "
                          >
                            <p style="margin: 0">
                              <a
                                href="http://litmus.com"
                                target="_blank"
                                style="color: #f33f3f"
                                >XXX.XXXXXXX.XXX/XXXXXXXXXXXXX</a
                              >
                            </p>
                          </td>
                        </tr>
                        <!-- COPY -->
                        <tr>
                          <td
                            bgcolor="#ffffff"
                            align="left"
                            style="
                              padding: 0px 30px 20px 30px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 18px;
                              font-weight: 400;
                              line-height: 25px;
                            "
                          >
                            <p style="margin: 0">
                              If you have any questions, just reply to this email—we're
                              always happy to help out.
                            </p>
                          </td>
                        </tr>
                        <!-- COPY -->
                        <tr>
                          <td
                            bgcolor="#ffffff"
                            align="left"
                            style="
                              padding: 0px 30px 40px 30px;
                              border-radius: 0px 0px 4px 4px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 18px;
                              font-weight: 400;
                              line-height: 25px;
                            "
                          >
                            <p style="margin: 0">Cheers,<br />The CEE Team</p>
                          </td>
                        </tr>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                  </tr>
                  <!-- SUPPORT CALLOUT -->
                  <tr>
                    <td
                      bgcolor="#f4f4f4"
                      align="center"
                      style="padding: 30px 10px 0px 10px"
                    >
                      <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                        <tr>
                        <td align="center" valign="top" width="600">
                        <![endif]-->
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px"
                      >
                        <!-- HEADLINE -->
                        <tr>
                          <td
                            bgcolor="#e37878"
                            align="center"
                            style="
                              padding: 30px 30px 30px 30px;
                              border-radius: 4px 4px 4px 4px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 18px;
                              font-weight: 400;
                              line-height: 25px;
                            "
                          >
                            <h2
                              style="
                                font-size: 20px;
                                font-weight: 400;
                                color: #111111;
                                margin: 0;
                              "
                            >
                              Need more help?
                            </h2>
                            <p style="margin: 0">
                              <a
                                href="http://litmus.com"
                                target="_blank"
                                style="color: #000000"
                                >We&rsquo;re here, ready to talk</a
                              >
                            </p>
                          </td>
                        </tr>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                  </tr>
                  <!-- FOOTER -->
                  <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
                      <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                        <tr>
                        <td align="center" valign="top" width="600">
                        <![endif]-->
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="max-width: 600px"
                      >
                        <!-- NAVIGATION -->
                        <tr>
                          <td
                            bgcolor="#f4f4f4"
                            align="left"
                            style="
                              padding: 30px 30px 30px 30px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              font-weight: 400;
                              line-height: 18px;
                            "
                          >
                            <p style="margin: 0">
                              <a
                                href="http://litmus.com"
                                target="_blank"
                                style="color: #111111; font-weight: 700"
                                >Dashboard</a
                              >
                              -
                              <a
                                href="http://litmus.com"
                                target="_blank"
                                style="color: #111111; font-weight: 700"
                                >Billing</a
                              >
                              -
                              <a
                                href="http://litmus.com"
                                target="_blank"
                                style="color: #111111; font-weight: 700"
                                >Help</a
                              >
                            </p>
                          </td>
                        </tr>
                        <!-- PERMISSION REMINDER -->
                        <tr>
                          <td
                            bgcolor="#f4f4f4"
                            align="left"
                            style="
                              padding: 0px 30px 30px 30px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              font-weight: 400;
                              line-height: 18px;
                            "
                          >
                            <p style="margin: 0">
                              You received this email because you just signed up for a new
                              account. If it looks weird,
                              <a
                                href="http://litmus.com"
                                target="_blank"
                                style="color: #111111; font-weight: 700"
                                >view it in your browser</a
                              >.
                            </p>
                          </td>
                        </tr>
                        <!-- UNSUBSCRIBE -->
                        <tr>
                          <td
                            bgcolor="#f4f4f4"
                            align="left"
                            style="
                              padding: 0px 30px 30px 30px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              font-weight: 400;
                              line-height: 18px;
                            "
                          >
                            <p style="margin: 0">
                              If these emails get annoying, please feel free to
                              <a
                                href="http://litmus.com"
                                target="_blank"
                                style="color: #111111; font-weight: 700"
                                >unsubscribe</a
                              >.
                            </p>
                          </td>
                        </tr>
                        <!-- ADDRESS -->
                        <tr>
                          <td
                            bgcolor="#f4f4f4"
                            align="left"
                            style="
                              padding: 0px 30px 30px 30px;
                              color: #666666;
                              font-family: Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              font-weight: 400;
                              line-height: 18px;
                            "
                          >
                            <p style="margin: 0">
                              Ceej - 1234 Main Street - Anywhere, MA - 56789
                            </p>
                          </td>
                        </tr>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                  </tr>
                </table>
              </body>
            </html>
            `, // html body
        }
        const info = await transporter.sendMail(msg);
        let obj = {
            status:'success'
        }
        res.send('success')
    }
    catch(err){
        res.status(404).send(`sending email error in route: ${err}`)
    }
})

emailRouter.post('/order', validateMiddleWare,async(req:express.Request,res:express.Response)=>{
  try{
      const id = req.cookies.id;
      const orderid= req.body.id;
      const price = req.body.price;
      const totalPrice = req.body.Totalprice;
      const quantity = req.body.quantity;
      const result = await userInfoData(id);
      const email = result.email;
      const subject = 'Thank You for Your Order from CEE STORE - Your Shopping Success!';
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 3);
      const monthNames = [
          "January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"
      ];
      const month = monthNames[currentDate.getMonth()];
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();
      function getDayWithSuffix(day: number): string {
      if (day >= 11 && day <= 13) {
            return day + "th";
      }
      switch (day % 10) {
            case 1:
              return day + "st";
            case 2:
              return day + "nd";
            case 3:
              return day + "rd";
            default:
              return day + "th";
          }
      }
      const formattedDate = `${month} ${getDayWithSuffix(day)}, ${year}`;
      const transporter = nodemailer.createTransport({
          service:"gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
      });
      const msg = {
          from: `${process.env.EMAIL}`, // sender address
          to: `${email}`, // list of receivers
          subject: `${subject}`, // Subject line
          html: `<!-- THIS EMAIL WAS BUILT AND TESTED WITH LITMUS http://litmus.com -->
          <!-- IT WAS RELEASED UNDER THE MIT LICENSE https://opensource.org/licenses/MIT -->
          <!-- QUESTIONS? TWEET US @LITMUSAPP -->
          <!doctype html>
          <html>
            <head>
              <title></title>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <style type="text/css">
                /* CLIENT-SPECIFIC STYLES */
                body,
                table,
                td,
                a {
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
                }
                table,
                td {
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                }
                img {
                  -ms-interpolation-mode: bicubic;
                }
          
                /* RESET STYLES */
                img {
                  border: 0;
                  height: auto;
                  line-height: 100%;
                  outline: none;
                  text-decoration: none;
                }
                table {
                  border-collapse: collapse !important;
                }
                body {
                  height: 100% !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  width: 100% !important;
                }
          
                /* iOS BLUE LINKS */
                a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: none !important;
                  font-size: inherit !important;
                  font-family: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                }
          
                /* MEDIA QUERIES */
                @media screen and (max-width: 480px) {
                  .mobile-hide {
                    display: none !important;
                  }
                  .mobile-center {
                    text-align: center !important;
                  }
                }
          
                /* ANDROID CENTER FIX */
                div[style*="margin: 16px 0;"] {
                  margin: 0 !important;
                }
              </style>
            </head>
            <body
              style="
                margin: 0 !important;
                padding: 0 !important;
                background-color: #eeeeee;
              "
              bgcolor="#eeeeee"
            >
              <!-- HIDDEN PREHEADER TEXT -->
              <div
                style="
                  display: none;
                  font-size: 1px;
                  color: #fefefe;
                  line-height: 1px;
                  font-family:
                    Open Sans,
                    Helvetica,
                    Arial,
                    sans-serif;
                  max-height: 0px;
                  max-width: 0px;
                  opacity: 0;
                  overflow: hidden;
                "
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus dolor
                aliquid omnis consequatur est deserunt, odio neque blanditiis aspernatur,
                mollitia ipsa distinctio, culpa fuga obcaecati!
              </div>
          
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="background-color: #eeeeee" bgcolor="#eeeeee">
                    <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="center" valign="top" width="600">
                  <![endif]-->
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="max-width: 600px"
                    >
                      <tr>
                        <td
                          align="center"
                          valign="top"
                          style="font-size: 0; padding: 35px"
                          bgcolor="#000000"
                        >
                          <!--[if (gte mso 9)|(IE)]>
                          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                          <tr>
                          <td align="left" valign="top" width="300">
                          <![endif]-->
                          <div
                            style="
                              display: inline-block;
                              max-width: 50%;
                              min-width: 100px;
                              vertical-align: top;
                              width: 100%;
                            "
                          >
                            <table
                              align="left"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="max-width: 300px"
                            >
                              <tr>
                                <td
                                  align="left"
                                  valign="top"
                                  style="
                                    font-family:
                                      Open Sans,
                                      Helvetica,
                                      Arial,
                                      sans-serif;
                                    font-size: 36px;
                                    font-weight: 800;
                                    line-height: 48px;
                                  "
                                  class="mobile-center"
                                >
                                  <h1
                                    style="
                                      font-size: 36px;
                                      font-weight: 800;
                                      margin: 0;
                                      color: #ffffff;
                                      color: #fff;
                                      text-transform: uppercase;
                                      font-size: 24px;
                                      font-weight: 700;
                                      -webkit-transition: all 0.3s ease 0s;
                                      -moz-transition: all 0.3s ease 0s;
                                      -o-transition: all 0.3s ease 0s;
                                      transition: all 0.3s ease 0s;
                                    "
                                  >
                                    CEE
                                    <em style="font-style: normal; color: #f33f3f"
                                      >STORE</em
                                    >
                                  </h1>
                                </td>
                              </tr>
                            </table>
                          </div>
                          <!--[if (gte mso 9)|(IE)]>
                          </td>
                          <td align="right" width="300">
                          <![endif]-->
                          <div
                            style="
                              display: inline-block;
                              max-width: 50%;
                              min-width: 100px;
                              vertical-align: top;
                              width: 100%;
                            "
                            class="mobile-hide"
                          >
                            <table
                              align="left"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              style="max-width: 300px"
                            >
                              <tr>
                                <td
                                  align="right"
                                  valign="top"
                                  style="
                                    font-family:
                                      Open Sans,
                                      Helvetica,
                                      Arial,
                                      sans-serif;
                                    font-size: 48px;
                                    font-weight: 400;
                                    line-height: 48px;
                                  "
                                >
                                  <table
                                    cellspacing="0"
                                    cellpadding="0"
                                    border="0"
                                    align="right"
                                  >
                                    <tr>
                                      <td
                                        style="
                                          font-family:
                                            Open Sans,
                                            Helvetica,
                                            Arial,
                                            sans-serif;
                                          font-size: 18px;
                                          font-weight: 400;
                                        "
                                      >
                                        <p
                                          style="
                                            font-size: 18px;
                                            font-weight: 400;
                                            margin: 0;
                                            color: #ffffff;
                                          "
                                        >
                                          <a
                                            href="http://litmus.com"
                                            target="_blank"
                                            style="color: #ffffff; text-decoration: none"
                                            >Shop &nbsp;</a
                                          >
                                        </p>
                                      </td>
                                      <td
                                        style="
                                          font-family:
                                            Open Sans,
                                            Helvetica,
                                            Arial,
                                            sans-serif;
                                          font-size: 18px;
                                          font-weight: 400;
                                          line-height: 24px;
                                        "
                                      >
                                        <a
                                          href="http://litmus.com"
                                          target="_blank"
                                          style="color: #ffffff; text-decoration: none"
                                          ><img
                                            src="http://drive.google.com/uc?export=view&id=1R8CMep3WlIC6vpXgI9etaJi8od0mAEir"
                                            width="35"
                                            height="35"
                                            style="display: block; border: 0px"
                                        /></a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </div>
                          <!--[if (gte mso 9)|(IE)]>
                          </td>
                          </tr>
                          </table>
                          <![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="padding: 35px 35px 20px 35px; background-color: #ffffff"
                          bgcolor="#ffffff"
                        >
                          <!--[if (gte mso 9)|(IE)]>
                          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                          <tr>
                          <td align="center" valign="top" width="600">
                          <![endif]-->
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 600px"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-family:
                                    Open Sans,
                                    Helvetica,
                                    Arial,
                                    sans-serif;
                                  font-size: 16px;
                                  font-weight: 400;
                                  line-height: 24px;
                                  padding-top: 25px;
                                "
                              >
                                <img
                                  src="http://drive.google.com/uc?export=view&id=1hPgwUDz3qX5FcTwnxKgQ-gHpMM77OxBR"
                                  
                                  width="125"
                                  height="120"
                                  style="display: block; border: 0px"
                                /><br />
                                <h2
                                  style="
                                    font-size: 30px;
                                    font-weight: 800;
                                    line-height: 36px;
                                    color: #333333;
                                    margin: 0;
                                  "
                                >
                                  Thank You For Your Order!
                                </h2>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="left"
                                style="
                                  font-family:
                                    Open Sans,
                                    Helvetica,
                                    Arial,
                                    sans-serif;
                                  font-size: 16px;
                                  font-weight: 400;
                                  line-height: 24px;
                                  padding-top: 10px;
                                "
                              >
                                <p
                                  style="
                                    font-size: 16px;
                                    font-weight: 400;
                                    line-height: 24px;
                                    color: #777777;
                                  "
                                >
                                  we can't wait to serve you again!
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="padding-top: 20px">
                                <table
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      width="75%"
                                      align="left"
                                      bgcolor="#eeeeee"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 800;
                                        line-height: 24px;
                                        padding: 10px;
                                      "
                                    >
                                      Order Confirmation #
                                    </td>
                                    <td
                                      width="25%"
                                      align="left"
                                      bgcolor="#eeeeee"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 800;
                                        line-height: 24px;
                                        padding: 10px;
                                      "
                                    >
                                      ${orderid}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      width="75%"
                                      align="left"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 24px;
                                        padding: 15px 10px 5px 10px;
                                      "
                                    >
                                      Purchased Item (${quantity})
                                    </td>
                                    <td
                                      width="25%"
                                      align="left"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 24px;
                                        padding: 15px 10px 5px 10px;
                                      "
                                    >
                                      €${price}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      width="75%"
                                      align="left"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 24px;
                                        padding: 5px 10px;
                                      "
                                    >
                                      Shipping
                                    </td>
                                    <td
                                      width="25%"
                                      align="left"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 400;
                                        line-height: 24px;
                                        padding: 5px 10px;
                                      "
                                    >
                                      €5.00
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="left" style="padding-top: 20px">
                                <table
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      width="75%"
                                      align="left"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 800;
                                        line-height: 24px;
                                        padding: 10px;
                                        border-top: 3px solid #eeeeee;
                                        border-bottom: 3px solid #eeeeee;
                                      "
                                    >
                                      TOTAL
                                    </td>
                                    <td
                                      width="25%"
                                      align="left"
                                      style="
                                        font-family:
                                          Open Sans,
                                          Helvetica,
                                          Arial,
                                          sans-serif;
                                        font-size: 16px;
                                        font-weight: 800;
                                        line-height: 24px;
                                        padding: 10px;
                                        border-top: 3px solid #eeeeee;
                                        border-bottom: 3px solid #eeeeee;
                                      "
                                    >
                                      €${totalPrice}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <!--[if (gte mso 9)|(IE)]>
                          </td>
                          </tr>
                          </table>
                          <![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          height="100%"
                          valign="top"
                          width="100%"
                          style="padding: 0 35px 35px 35px; background-color: #ffffff"
                          bgcolor="#ffffff"
                        >
                          <!--[if (gte mso 9)|(IE)]>
                          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                          <tr>
                          <td align="center" valign="top" width="600">
                          <![endif]-->
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 660px"
                          >
                            <tr>
                              <td align="center" valign="top" style="font-size: 0">
                                <!--[if (gte mso 9)|(IE)]>
                                      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                                      <tr>
                                      <td align="left" valign="top" width="300">
                                      <![endif]-->
                                <div
                                  style="
                                    display: inline-block;
                                    max-width: 50%;
                                    min-width: 240px;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                >
                                  <table
                                    align="left"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="max-width: 300px"
                                  >
                                    <tr>
                                      <td
                                        align="left"
                                        valign="top"
                                        style="
                                          font-family:
                                            Open Sans,
                                            Helvetica,
                                            Arial,
                                            sans-serif;
                                          font-size: 16px;
                                          font-weight: 400;
                                          line-height: 24px;
                                        "
                                      >
                                        <p style="font-weight: 800">Delivery Address</p>
                                        <p>
                                          675 Massachusetts Avenue<br />11th Floor<br />Cambridge,
                                          MA 02139
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <!--[if (gte mso 9)|(IE)]>
                                      </td>
                                      <td align="left" valign="top" width="300">
                                      <![endif]-->
                                <div
                                  style="
                                    display: inline-block;
                                    max-width: 50%;
                                    min-width: 240px;
                                    vertical-align: top;
                                    width: 100%;
                                  "
                                >
                                  <table
                                    align="left"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="max-width: 300px"
                                  >
                                    <tr>
                                      <td
                                        align="left"
                                        valign="top"
                                        style="
                                          font-family:
                                            Open Sans,
                                            Helvetica,
                                            Arial,
                                            sans-serif;
                                          font-size: 16px;
                                          font-weight: 400;
                                          line-height: 24px;
                                        "
                                      >
                                        <p style="font-weight: 800">
                                          Estimated Delivery Date
                                        </p>
                                        <p>${formattedDate}</p>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <!--[if (gte mso 9)|(IE)]>
                                      </td>
                                      </tr>
                                      </table>
                                      <![endif]-->
                              </td>
                            </tr>
                          </table>
                          <!--[if (gte mso 9)|(IE)]>
                          </td>
                          </tr>
                          </table>
                          <![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="padding: 35px; background-color: #0b1313"
                          bgcolor="#1b9ba3"
                        >
                          <!--[if (gte mso 9)|(IE)]>
                          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                          <tr>
                          <td align="center" valign="top" width="600">
                          <![endif]-->
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 600px"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-family:
                                    Open Sans,
                                    Helvetica,
                                    Arial,
                                    sans-serif;
                                  font-size: 16px;
                                  font-weight: 400;
                                  line-height: 24px;
                                  padding-top: 25px;
                                "
                              >
                                <h2
                                  style="
                                    font-size: 24px;
                                    font-weight: 800;
                                    line-height: 30px;
                                    color: #ffffff;
                                    margin: 0;
                                  "
                                >
                                  Get 25% off your next order.
                                </h2>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="padding: 25px 0 15px 0">
                                <table border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td
                                      align="center"
                                      style="border-radius: 5px"
                                      bgcolor="#66b3b7"
                                    >
                                      <a
                                        href="http://localhost:8000/main/home"
                                        target="_blank"
                                        style="
                                          font-size: 18px;
                                          font-family:
                                            Open Sans,
                                            Helvetica,
                                            Arial,
                                            sans-serif;
                                          color: #ffffff;
                                          text-decoration: none;
                                          border-radius: 5px;
                                          background-color: #f33f3f;
                                          padding: 15px 30px;
                                          border: 1px solid #f33f3f;
                                          display: block;
                                        "
                                        >Awesome</a
                                      >
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <!--[if (gte mso 9)|(IE)]>
                          </td>
                          </tr>
                          </table>
                          <![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="padding: 35px; background-color: #ffffff"
                          bgcolor="#ffffff"
                        >
                          <!--[if (gte mso 9)|(IE)]>
                          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                          <tr>
                          <td align="center" valign="top" width="600">
                          <![endif]-->
                          <table
                            align="center"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="max-width: 600px"
                          >
                            <tr>
                              <td align="center">
                                <img
                                  src="http://drive.google.com/uc?export=view&id=1j7P3WBY3ykqi8RkhPctkAGQ5Xdxyw0Q5"
                                  width="150"
                                  height="150"
                                  style="display: block; border: 0px"
                                />
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-family:
                                    Open Sans,
                                    Helvetica,
                                    Arial,
                                    sans-serif;
                                  font-size: 14px;
                                  font-weight: 400;
                                  line-height: 24px;
                                  padding: 5px 0 10px 0;
                                "
                              >
                                <p
                                  style="
                                    font-size: 14px;
                                    font-weight: 800;
                                    line-height: 18px;
                                    color: #333333;
                                  "
                                >
                                  675 Massachusetts Avenue<br />
                                  Cambridge, MA 02139
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="left"
                                style="
                                  font-family:
                                    Open Sans,
                                    Helvetica,
                                    Arial,
                                    sans-serif;
                                  font-size: 14px;
                                  font-weight: 400;
                                  line-height: 24px;
                                "
                              >
                                <p
                                  style="
                                    font-size: 14px;
                                    font-weight: 400;
                                    line-height: 20px;
                                    color: #777777;
                                  "
                                >
                                  If you didn't create an account using this email
                                  address, please ignore this email or
                                  <a
                                    style="color: #777777"
                                    >unsusbscribe</a
                                  >.
                                </p>
                              </td>
                            </tr>
                          </table>
                          <!--[if (gte mso 9)|(IE)]>
                          </td>
                          </tr>
                          </table>
                          <![endif]-->
                        </td>
                      </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  </td>
                </tr>
              </table>
              <!-- LITMUS ATTRIBUTION -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td bgcolor="#ffffff" align="center">
                    <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="max-width: 600px"
                    >
                      <tr>
                        <td
                          bgcolor="#ffffff"
                          align="center"
                          style="
                            padding: 30px 30px 30px 30px;
                            color: #666666;
                            font-family: Helvetica, Arial, sans-serif;
                            font-size: 14px;
                            font-weight: 400;
                            line-height: 18px;
                          "
                        ></td>
                      </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
                  </td>
                </tr>
              </table>
              <!-- END LITMUS ATTRIBUTION -->
            </body>
          </html>
          `, // html body
      }
      const info = await transporter.sendMail(msg);
      let obj = {
          status:'success'
      }
      res.send('success')
  }
  catch(err){
      res.status(404).send(`sending email error in route: ${err}`)
  }
})
export default emailRouter;
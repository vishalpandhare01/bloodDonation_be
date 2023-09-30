import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sentOTPEmail(
  email: string,
  username: string,
  otp: number
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  const SENDMAIL = async (mailDetails: any, callback: any) => {
    try {
      const info = await transporter.sendMail(mailDetails);
      callback(info);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const message = "Hi there, Welcome to Blood donation";
  const options = {
    from: "vp5748437@gmail.com", 
    to: `${email}`,
    subject: "ONE TIME OTP (Blood donation app)", 
    text: message,
    html: `
    <body style="font-family: Arial, sans-serif; background-color: #f0f0f0; text-align: center;">
          <div style="background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); width: 300px; margin: 0 auto; margin-top: 50px;">
            <p>Dear ${username}<p>
             <div style="font-size: 24px; margin-bottom: 20px;">Your OTP Code</div>
             <div style="font-size: 36px; font-weight: bold; color: #007bff;">${otp}</div>
            <div style="margin-top: 20px; font-size: 16px;">Please use this code to complete your verification.</div>
       </div>
   </body>
    
    `,
  };
  SENDMAIL(options, (info: any) => {
    console.log("Email sent successfully");
    console.log("MESSAGE ID: ", info.messageId);
  });
  return true;
}

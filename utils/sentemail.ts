import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();


export async function sentEmail(email: string, username: string) {
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
      console.log(error)
       return false
    }
  };

  const message = "Hi there, Welcome to Blood donation";
  const options = {
    from: "vp5748437@gmail.com", // sender address
    to: `${email}`, // receiver email
    subject: "WELLCOME TO BLOOD DONATION GROUP ", // Subject line
    text: message,
    html: `
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F6F6F6; text-align: center; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); border-radius: 10px;">
            <h1 style="color: #FF5733;">🎉 Registration Confirmed! 🎉</h1>
            <p>
                <img src="https://example.com/images/checkmark.png" alt="Checkmark Icon" style="width: 100px; height: 100px;">
            </p>
            <p>
                Dear ${username},
            </p>
            <p style="font-size: 18px;">
                Congratulations! Your registration with the Blood Donation App is now officially confirmed.
            </p>
            <p style="font-size: 18px;">
                You've taken a remarkable step toward making a positive impact in the world by donating blood and saving lives.
            </p>
            <p style="font-size: 18px;">
                <strong>Your Next Steps:</strong><br>
                <a href="[Profile Link]" style="color: #FF5733; text-decoration: none; font-weight: bold;">Complete Your Profile</a> to personalize your experience.<br>
                <a href="[Donation Centers Link]" style="color: #FF5733; text-decoration: none; font-weight: bold;">Find Donation Centers</a> nearby to schedule your first donation.
            </p>
            <p style="font-size: 18px;">
                If you ever have questions or need assistance, please feel free to contact our dedicated support team.
            </p>
            <p style="font-size: 18px; color: #FF5733;">
                Thank you for being a part of our mission to make a difference!
            </p>
            <p style="font-size: 18px;">
                Warm regards,
                <br>
                The Blood Donation App Team
            </p>
        </div>
    
    `
  };
  SENDMAIL(options, (info: any) => {
    console.log("Email sent successfully");
    console.log("MESSAGE ID: ", info.messageId);
  });
  return true
}

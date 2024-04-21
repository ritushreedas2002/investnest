import nodemailer from 'nodemailer';
import bcyrptjs from "bcryptjs";
import User from "@/models/userModel";
export const sendEmail = async({email, emailType, userId}) => {
    try {
      const hashToken = await bcyrptjs.hash(userId.toString(), 10);
       
        if(emailType==="VERIFY"){
          await User.findByIdAndUpdate(userId, {$set:{verifyToken: hashToken, verifyTokenExpiry: Date.now() + 3600000}})

        }else if(emailType==="RESET"){
          await User.findByIdAndUpdate(userId,
            {$set:{forgotPasswordToken:hashToken,forgotPasswordTokenExpiry:Date.now()+3600000}})
        }
        var transporter= nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "12cebde5a46c78",
            pass: "bc721ca6a4699f"
          }
        });

          const mailOptions = {
            from: "riitushreedas20027@gmail.com", // sender address
            to:email, // list of receivers
            subject: emailType==='VERIFY'?"Verify your mail":"Reset Your Mail", // Subject line
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}&type=${emailType === "VERIFY" ? "VERIFY" : "RESET"}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashToken}
            </p>`
          };

          const mailResponse=await transporter.sendMail(mailOptions);
          return mailResponse;
        
    } catch (error) {
        throw new Error(error.message);
    }
}
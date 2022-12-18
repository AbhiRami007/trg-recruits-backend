import nodemailer from "nodemailer";
export const emailSender:any = async(mailTo, subject, message) =>{
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });
        await transporter.sendMail({
            from: process.env.USER,
            to: mailTo,
            subject: subject,
            html: message,
        });
        console.log("successfully sent email");
    } catch (e) {
        console.log("email not send");
        console.log(e);
    }
};

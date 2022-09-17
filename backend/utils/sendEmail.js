const nodemailer = require("nodemailer");

module.exports = async(email, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host:process.env.HOST,
            service:process.env.SERVICE,
            post:Number(process.env.EMAIL_PORT),
            secure:Boolean(process.env.SECURE),
            auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
        });
        await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			html: html
		});
		console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent!");
		console.log(error);
		return error;
    }
}
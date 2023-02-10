require("dotenv").config();
const nodemailer = require("nodemailer");
const { EMAIL_FROM, EMAIL_PASS, EMAIL_USER } = process.env;

async function sendEmail(email, verificationToken) {
    try {
        console.log(email, 'email')
        const sendedEmail = {
            from: EMAIL_FROM,
            to: email,
            subject: "Verification",
            html: `<h1>Follow the link for verification</h1>
                <a href="http://localhost:3000/api/users/verify/${verificationToken}">Verification</a>`,
            text: `http://localhost:3000/api/users/verify/${verificationToken}`,
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        })

        await transport.sendMail(sendedEmail)
    } catch (error) {
        console.error("app error:", error)
    }
}

module.exports = { sendEmail }
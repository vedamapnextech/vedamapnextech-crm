const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: Number(process.env.BREVO_SMTP_PORT),
    secure: false,

    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("❌ BREVO EMAIL CONFIG ERROR:", error);
    } else {
        console.log("✅ BREVO EMAIL SERVER READY");
    }
});

module.exports = transporter;
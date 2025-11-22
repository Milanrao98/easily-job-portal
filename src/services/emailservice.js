import nodemailer from "nodemailer";

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "yourEmail@gmail.com",
                pass: "your-app-password"
            }
        });
    }

    async sendApplicationEmail(toEmail, jobTitle) {
        const mailOptions = {
            from: "yourEmail@gmail.com",
            to: toEmail,
            subject: "Application Received",
            html: `
                <h2>Hi there,</h2>
                <p>Your application for <strong>${jobTitle}</strong> has been received.</p>
                <p>Our team will contact you soon.</p>
            `
        };

        return this.transporter.sendMail(mailOptions);
    }
}

export default new EmailService();

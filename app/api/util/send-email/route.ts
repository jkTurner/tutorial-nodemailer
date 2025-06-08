import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
 
export async function POST(request: Request) {
    const { name, email, message } = await request.json();
 
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    });
 
    try {
        const info = await transporter.sendMail({
            from: `${name}: <${email}>`,
            to: process.env.SMTP_EMAIL,
            subject: "Email from my website",
            text: `You've received a new message from ${name} (${email}):\n\n${message}`,
        });
 
        console.log("Email sent: %s", info.messageId);
        return NextResponse.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email: ", error);
        return NextResponse.json({ message: "Error sending email."}, { status: 500 });
    }
}
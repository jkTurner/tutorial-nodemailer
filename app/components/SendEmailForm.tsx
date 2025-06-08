'use client'
import { useState } from "react";
 
const SendEmailForm = () => {
 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Sending the email...");
        try {
            const res = await fetch("/api/util/send-email", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });
 
            if (res.ok) {
                setStatus("Email sent successfully");
                setName("");
                setEmail("");
                setMessage("");
            } else {
                setStatus("Failed to send email, please try again.");
            }
        } catch (error) {
            console.error("Error sending email: ", error);
            setStatus("Failed to send email, please try again.");
        }
    };
 
    return (
        <form onSubmit={handleSubmit} className="w-[600px] flex flex-col gap-[24px] p-[24px] bg-gray-600">
            <div className="flex gap-[24px] w-full">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-gray-500 p-[8px] w-full max-w-[50%]"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-500 p-[8px] w-full max-w-[50%]"
                />
            </div>
            <textarea
                placeholder="Message.."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="bg-gray-500 p-[8px] w-full min-h-[200px]"
            />
            { status && (
                <div className="w-full text-violet-300">{status}</div>
            )}
            <button
                type="submit"
                className="bg-violet-300 py-[6px] px-[24px]"
                >Send</button>
        </form>
    )
}
 
export default SendEmailForm;
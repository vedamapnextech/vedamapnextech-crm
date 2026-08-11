const transporter = {
    sendMail: async ({ from, to, subject, html, text }) => {
        const response = await fetch(
            "https://api.brevo.com/v3/smtp/email",
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    sender: {
                        email: from || process.env.EMAIL_FROM,
                        name: "JobTrack CRM",
                    },
                    to: [
                        {
                            email: to,
                        },
                    ],
                    subject,
                    htmlContent: html,
                    textContent: text || "JobTrack CRM notification",
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("❌ BREVO API ERROR:", data);
            throw new Error(
                data.message || "Brevo email sending failed"
            );
        }

        console.log("✅ BREVO EMAIL SENT:", data.messageId);

        return data;
    },
};

module.exports = transporter;
import nodemailer from "nodemailer";

export default async function sendVerificationEmail(email: string, token: string) {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS_ADMIN,
    },
  });

  const url = `http://localhost:3000/api/admin-x98p9v1k?token=${token}`;

  await transport.sendMail({
    from: '"Admin Panel" <no-reply@example.com>',
    to: email,
    subject: "Verify your admin account",
    html: `<p>Click the link to verify your email:</p><a href="${url}">${url}</a>`,
  });
}

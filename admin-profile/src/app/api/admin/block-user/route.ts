import { dbConnect } from "@/src/config/dbConnect";
import userModel from "@/src/models/user.model";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { userId, blocked, days } = await req.json(); // 'blocked' is boolean

    await dbConnect();

    const updateData: any = {
      blocked: blocked,
      blockedUntil: blocked
        ? new Date(new Date().setDate(new Date().getDate() + (days || 7)))
        : null,
    };

    const user = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "User not found" }), {
        status: 404,
      });
    }

    // Email sending logic
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.BLOCK_PASS,
      },
    });

    const subject = blocked ? "Account Blocked" : "Account Unblocked";
    const text = blocked
      ? `Your account has been blocked for ${days || 7} days. You will not be able to access the platform until ${user.blockedUntil?.toDateString()}.`
      : "Your account has been unblocked. You can now access the platform again.";

    await transporter.sendMail({
      from: `"Dr Port" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject,
      text,
    });

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in block-user route:", error);
    return new Response(JSON.stringify({ success: false, message: "Internal server error" }), {
      status: 500,
    });
  }
}

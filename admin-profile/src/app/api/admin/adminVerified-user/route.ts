import { dbConnect } from "@/src/config/dbConnect";
import userModel from "@/src/models/user.model";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { userId, adminVerified} = await req.json(); // 'blocked' is boolean

    await dbConnect();

    const updateData: any = {
      adminVerified: adminVerified,
    
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
        pass: process.env.adminVerified,
      },
    });

    const subject = adminVerified ? "Account Verified" : "Account Unverified";
    const text = adminVerified
      ? " Congratulation Your account has been Verified ."
      : "Your account has been unVerified.";

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
    console.error("Error in adminVerified-user route:", error);
    return new Response(JSON.stringify({ success: false, message: "Internal server error" }), {
      status: 500,
    });
  }
}

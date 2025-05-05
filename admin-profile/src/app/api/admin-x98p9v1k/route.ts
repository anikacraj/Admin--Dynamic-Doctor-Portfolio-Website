import { dbConnect } from '@/src/config/dbConnect';
import sendVerificationEmail from '@/src/lib/sendVerificationEmail';
import adminModel from '@/src/models/admin.model';
import bcrypt from 'bcryptjs';

import crypto from 'crypto'

export async function POST(req: Request) {
  await dbConnect();
  const { name, email, password, role, phoneNumber, dob } = await req.json();

  const existingAdmin = await adminModel.findOne({ email });
  if (existingAdmin) return new Response("Admin already exists", { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = new adminModel({
    name,
    email,
    password: hashedPassword,
    dob,
    phoneNumber,
  });

  const token = newAdmin.getVerificationToken();
  await newAdmin.save();

  await sendVerificationEmail(email, token);

  return new Response("Registration successful. Check your email to verify your account.", { status: 200 });
}


export async function GET(req: Request) {
    await dbConnect();
    const token = new URL(req.url).searchParams.get("token");
  
    const hashedToken = crypto.createHash("sha256").update(token!).digest("hex");
  
    const admin = await adminModel.findOne({
      verifyToken: hashedToken,
      verifyTokenExpire: { $gt: new Date() },
    });
  
    if (!admin) return new Response("Invalid or expired token", { status: 400 });
  
    admin.isVerified = true;
    admin.verifyToken = undefined;
    admin.verifyTokenExpire = undefined;
    await admin.save();
  
    return new Response("Email verified. You can now log in.", { status: 200 });
  }
  
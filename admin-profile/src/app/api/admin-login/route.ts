import { dbConnect } from "@/src/config/dbConnect";
import adminModel from "@/src/models/admin.model";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();
  const { email, password, phoneNumber, dob } = await req.json();

  const admin = await adminModel.findOne({ email });

  if (!admin) return new Response("Admin not found", { status: 404 });

  if (!admin.isVerified) {
    return new Response("Please verify your email before logging in.", { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch || admin.phoneNumber !== phoneNumber || admin.dob !== dob) {
    return new Response("Invalid credentials", { status: 401 });
  }

  // Here you would create a session/token
  return new Response("Login successful", { status: 200 });
}

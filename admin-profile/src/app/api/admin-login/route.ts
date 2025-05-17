import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 // Your Admin schema/model
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/src/config/dbConnect';
import adminModel from '@/src/models/admin.model';

export async function POST(request: NextRequest) {
  try {
    const { email, password, phoneNumber, dob } = await request.json();

    // Validate request
    if (!email || !password || !phoneNumber || !dob) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Connect to DB
    await dbConnect();

    // Find admin by email
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Check other fields match
    const isPhoneMatch = admin.phoneNumber === phoneNumber;
    const isDobMatch = admin.dob === dob;
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPhoneMatch || !isDobMatch || !isPasswordMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // If all match, return token
    const token = "sample-auth-token"; // You can generate real JWT if needed

    const response = NextResponse.json({ message: "Login successful", token }, { status: 200 });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

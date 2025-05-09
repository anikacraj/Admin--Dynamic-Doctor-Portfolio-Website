import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, phoneNumber, dob } = await request.json();
    
    // Validation checks
    if (!email || !password || !phoneNumber || !dob) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Replace with your actual authentication logic
    const isValid = (
      email === "admin@example.com" && 
      password === "admin123" &&
      phoneNumber === "+1234567890" &&
      dob === "1990-01-01"
    );
    
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials. Please check your inputs." },
        { status: 401 }
      );
    }

    // In real app, generate proper JWT token
    const token = "sample-auth-token";
    
    const response = NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
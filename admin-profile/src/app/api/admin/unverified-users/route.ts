import { dbConnect } from "@/src/config/dbConnect";
import userModel from "@/src/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const users = await userModel.find({ adminVerified: false });
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse('Failed to fetch users', { status: 500 });
  }
}

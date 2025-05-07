// src/app/api/get-users/route.ts


import { dbConnect } from "@/src/config/dbConnect";
import adminModel from "@/src/models/admin.model";
import userModel from "@/src/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const users = await userModel.find().lean();
  return NextResponse.json(users);
}
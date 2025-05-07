 // adjust path

import { dbConnect } from "@/src/config/dbConnect";
import userModel from "@/src/models/user.model";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const users = await userModel.find({ isVerified: true }); // ✅ filter for only verified
    return Response.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response('Failed to fetch users', { status: 500 });
  }
}

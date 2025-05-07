import { dbConnect } from "@/src/config/dbConnect";
import userModel from "@/src/models/user.model";

export async function GET() {
  await dbConnect();

  const users = await userModel.find({
    blocked: true,
    blockedUntil: { $gt: new Date() },
  });

  return Response.json({ users });
}

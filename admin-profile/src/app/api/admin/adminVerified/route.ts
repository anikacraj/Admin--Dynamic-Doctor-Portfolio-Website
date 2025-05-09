import { dbConnect } from "@/src/config/dbConnect";
import userModel from "@/src/models/user.model";

export async function GET() {
  await dbConnect();

  const users = await userModel.find({
    adminVerified: true,
   
  });

  return Response.json({ users });
}

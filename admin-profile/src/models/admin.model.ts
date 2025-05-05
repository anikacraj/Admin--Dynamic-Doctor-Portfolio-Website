import mongoose, { Document, Schema } from "mongoose";
import crypto from "crypto";

interface About{
  _id?:mongoose.Types.ObjectId;
  heading:string;
  description:string;
  mission:string;
  vision:string;
  team:string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  dob:string;
  phoneNumber:string;
  thumbnail :string;
  about?:About[];
  isVerified: boolean;
  verifyToken: string;
  verifyTokenExpire: Date;

  getVerificationToken(): string;
}

const AdminSchema: Schema<IAdmin> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
  },
  verifyTokenExpire: {
    type: Date,
  },
  thumbnail :{
type:String ,
  },
  about:{type:[{heading:String,description:String,MissingSlotContext:String,vision:String,team:String}],default:[]},
  
});

AdminSchema.methods.getVerificationToken = function (): string {
  // Generate a random token
  const rawToken = crypto.randomBytes(32).toString("hex");

  // Hash the token before saving to the DB for security
  this.verifyToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  // Set token expiration time (30 minutes)
  this.verifyTokenExpire = new Date(Date.now() + 30 * 60 * 1000);

  // Return raw token to be emailed to the user
  return rawToken;
};

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);

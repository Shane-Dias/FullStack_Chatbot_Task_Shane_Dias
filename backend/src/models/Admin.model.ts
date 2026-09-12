import { Schema, model, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin extends Document {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false, // never returned by default queries
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

adminSchema.methods.comparePassword = function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.passwordHash);
};

export const Admin = model<IAdmin>("Admin", adminSchema);

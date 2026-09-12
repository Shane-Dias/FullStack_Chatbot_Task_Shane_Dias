import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { env } from "../config/env";
import { Admin } from "../models/Admin.model";

/**
 * Run with: npm run seed:admin
 * Creates (or updates the password of) a single admin account, since
 * there is intentionally no public admin-registration endpoint.
 */
async function seed() {
  await mongoose.connect(env.mongodbUri);
  console.log("[seed] connected to MongoDB");

  const passwordHash = await bcrypt.hash(env.seedAdminPassword, 10);

  const admin = await Admin.findOneAndUpdate(
    { email: env.seedAdminEmail.toLowerCase() },
    { email: env.seedAdminEmail.toLowerCase(), passwordHash, name: env.seedAdminName },
    { upsert: true, new: true }
  );

  console.log(`[seed] Admin ready: ${admin.email}`);
  console.log(`[seed] Login with the SEED_ADMIN_PASSWORD from your .env file`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});

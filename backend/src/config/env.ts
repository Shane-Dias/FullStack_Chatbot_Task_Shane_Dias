import dotenv from "dotenv";

dotenv.config();

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  mongodbUri: required("MONGODB_URI"),
  jwtSecret: required("JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "2h",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  seedAdminEmail: process.env.SEED_ADMIN_EMAIL || "admin@dronetv.in",
  seedAdminPassword: process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!",
  seedAdminName: process.env.SEED_ADMIN_NAME || "DroneTV Admin",
};

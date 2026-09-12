import mongoose from "mongoose";
import { env } from "./env";

mongoose.set("strictQuery", true);

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(env.mongodbUri);
    console.log(`[db] MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error("[db] MongoDB connection failed:", (err as Error).message);
    // Fail fast - the API is useless without a database connection.
    process.exit(1);
  }
}

mongoose.connection.on("disconnected", () => {
  console.warn("[db] MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("[db] MongoDB connection error:", err.message);
});

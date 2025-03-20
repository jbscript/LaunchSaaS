import { UserTable } from "./schema";
import {
  generateSalt,
  hashPassword,
} from "@/components/auth/core/passwordHasher";
import { eq } from "drizzle-orm";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const db = drizzle({
  schema,
  connection: {
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
});

async function ensureAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin"; // Change this to your preferred admin email
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin"; // Change this before production

  // Check if an admin user already exists
  const existingAdmin = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.email, adminEmail))
    .limit(1);

  if (existingAdmin.length === 0) {
    console.log("No admin found, creating a new admin user...");

    // Hash the password before storing it
    const salt = generateSalt();
    const hashedPassword = await hashPassword(adminPassword, salt);

    // Insert the admin user
    await db.insert(UserTable).values({
      name: "Admin",
      email: adminEmail,
      emailVerified: true,
      password: hashedPassword,
      role: "admin", // Use the enum role,
      salt,
    });

    console.log("✅ Admin user created successfully!");
  } else {
    console.log("✅ Admin user already exists.");
  }
}

// Run the function
ensureAdminUser()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error creating admin user:", err);
    process.exit(1);
  });

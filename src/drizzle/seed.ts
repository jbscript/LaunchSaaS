import { UserTable } from "./schema";
import { db } from "./db";
import {
  generateSalt,
  hashPassword,
} from "@/components/auth/core/passwordHasher";
import { eq } from "drizzle-orm";

async function ensureAdminUser() {
  const adminEmail = "admin@example.com"; // Change this to your preferred admin email
  const adminPassword = "securepassword"; // Change this before production

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

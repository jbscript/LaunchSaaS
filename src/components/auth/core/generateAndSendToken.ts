import { env } from "@/data/env/server";
import { db } from "@/drizzle/db";
import { UserTokenTable } from "@/drizzle/schema";
import { sendMail } from "@/lib/send-mail";
import crypto from "crypto";

type SendTokenProps = {
  email: string;
  userId: string;
};

const EMAIL_TOKEN_EXPIRATION_MS = 15 * 60 * 1000; // 15 minutes

export async function generateAndSendToken({ email, userId }: SendTokenProps) {
  const token = crypto.randomBytes(32).toString("hex"); // 64-character secure token

  await db.insert(UserTokenTable).values({
    userId,
    token,
    type: "email_verification",
    expiresAt: new Date(Date.now() + EMAIL_TOKEN_EXPIRATION_MS),
  });

  await sendMail({
    email: env.SITE_MAIL_RECIEVER,
    sendTo: email,
    subject: "Verify your email",
    text: `
    Click the link below to verify your email:
    ${env.SITE_URL}/verify-email?token=${token}
    `,
  });
}

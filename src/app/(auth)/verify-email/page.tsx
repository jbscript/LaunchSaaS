import { db } from "@/drizzle/db";
import { UserTable, UserTokenTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

type VerifyEmailPageProps = {
  searchParams: { token?: string };
};

// Helper function to fetch the token record
async function getTokenRecord(token: string) {
  return db.query.UserTokenTable.findFirst({
    where: eq(UserTokenTable.token, token),
  });
}

// Helper function to verify email and delete token
async function verifyEmail(userId: string, tokenId: string) {
  await db.transaction(async (trx) => {
    await trx
      .update(UserTable)
      .set({ emailVerified: true })
      .where(eq(UserTable.id, userId)); // userId is now correctly a string

    await trx.delete(UserTokenTable).where(eq(UserTokenTable.id, tokenId)); // tokenId is also a string
  });
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const token = searchParams?.token;

  if (!token) {
    return <div>Invalid request. No token provided.</div>;
  }

  const tokenRecord = await getTokenRecord(token);

  if (!tokenRecord) {
    return <div>Invalid token.</div>;
  }

  if (new Date(tokenRecord.expiresAt) < new Date()) {
    return <div>Token has expired.</div>;
  }

  await verifyEmail(tokenRecord.userId, tokenRecord.id);

  return <div>Email successfully verified!</div>;
}

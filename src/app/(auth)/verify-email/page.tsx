import { db } from "@/drizzle/db";
import { UserTokenTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

type VerifyEmailPageProps = {
  searchParams: Promise<{ token?: string }>;
};
export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { token } = await searchParams;

  if (!token) return <div>Invalid request. No token provided.</div>;

  const tokenExist = await db.query.UserTokenTable.findFirst({
    where: eq(UserTokenTable.token, token),
  });
  console.log("🚀 ~ tokenExist:", tokenExist);

  return <div>Email successfully verified!</div>;
}

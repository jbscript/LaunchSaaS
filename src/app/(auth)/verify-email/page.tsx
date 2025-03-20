"use client"; // ✅ Convert to Client Component

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyAndCreateSession } from "@/components/auth/nextjs/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (email) return <CheckEmail />;
  if (token) return <VerifyEmail />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <p>Invalid request.</p>
    </div>
  );
}

function CheckEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Verify Your Email
          </CardTitle>
          <CardDescription>
            We&apos;ve sent a verification email to{" "}
            <span className="font-medium">{email}</span>. Click the link in the
            email to confirm your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If you didn&apos;t receive the email, check your spam folder.
            {/* or{" "}
            <Link href="#" className="font-medium underline underline-offset-4" prefetch={false}>
              resend verification
            </Link> */}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    const verifyEmail = async () => {
      try {
        const result = await verifyAndCreateSession(token);

        if (result.error) {
          setStatus("error");
        } else {
          setStatus("success");
          router.push("/app"); // ✅ Redirect after success
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      {status === "loading" && <p>Verifying your email...</p>}

      {status === "error" && <p>Invalid or expired token.</p>}
    </div>
  );
}

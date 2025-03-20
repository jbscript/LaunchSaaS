"use client";
import ForgotPasswordForm from "@/components/auth/nextjs/components/ForgotPasswordForm";
import ResetPasswordForm from "@/components/auth/nextjs/components/ResetPasswordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export default function ForgetPasswordPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (email) return <CheckEmail />;
  if (token) return <ResetPassword />;
  return <ForgetPassword />;
}

function CheckEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Reset Your Password
          </CardTitle>
          <CardDescription>
            We&apos;ve sent a password reset link to{" "}
            <span className="font-medium">{email}</span>. Click the link in the
            email to set a new password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If you didn&apos;t receive the email, check your spam folder. If you
            still don&apos;t see it, try requesting a new reset link.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function ResetPassword() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter a new password to reset your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}

function ForgetPassword() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address to receive a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}

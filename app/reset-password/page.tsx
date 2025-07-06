import Link from "next/link";
import { Suspense } from "react";
import { ResetPasswordForm } from "./components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Link href="/" className="flex flex-col items-center gap-2">
        <img src="/logo.png" alt="LIS Boutique" width={80} height={80} />
        <h1 className="text-2xl font-bold">LIS Boutique</h1>
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}

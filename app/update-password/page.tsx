import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { UpdatePasswordForm } from "./components/UpdatePasswordForm";

export default async function UpdatePasswordPage({searchParams} : any) {
  const params = await searchParams
  const err = params.error_description

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Link href="/" className="flex flex-col items-center gap-2">
        <Image src="/logo.png" alt="LIS Boutique" width={80} height={80} />
        <h1 className="text-2xl font-bold">LIS Boutique</h1>
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Suspense>
          <UpdatePasswordForm err={err}/>
        </Suspense>
      </div>
    </div>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";

import { UserAuthForm } from "@/components/auth/user-auth-form";
import { buttonVariants } from "@/components/ui/button";
import InitError from "@/components/auth/init-error";

import { ChevronLeft } from "lucide-react";
import { getCurrentSession } from "@/lib/session";
import { cn } from "@/lib/utils";
import { initializeBackend } from "@/lib/axios/axios";

const LoginPage = async () => {
  const session = await getCurrentSession();
  if (session) redirect("/teamspace");
  const init = await initializeBackend();
  if (!init) return <InitError />;

  return (
    <div className="relative min-h-screen min-w-screen">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute top-4 left-4 gap-1 -translate-x-4 sm:translate-x-0"
        )}
      >
        <ChevronLeft className="w-4 h-4" /> <span>Back</span>
      </Link>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
        <UserAuthForm />
      </div>
    </div>
  );
};

export default LoginPage;

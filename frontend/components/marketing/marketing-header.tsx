import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCurrentSession } from "@/lib/session";

const MarketingHeader = async () => {
  const session = await getCurrentSession();
  return (
    <header className="container py-4 sm:py-8 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Rocket className="w-5 h-5" />
        <h1 className="text-xl font-bold leading-none">teamspace</h1>
      </div>
      <nav>
        <>
          {session ? (
            <Link href="/teamspace" className={cn(buttonVariants())}>
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className={cn(buttonVariants())}>
              Login
            </Link>
          )}
        </>
      </nav>
    </header>
  );
};

export { MarketingHeader };

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { ChevronLeft, Rocket } from "lucide-react";

const Loading = () => {
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
        <div className="space-y-6 max-w-[350px] mx-auto">
          <div className="flex flex-col gap-2 items-center">
            <Rocket className="w-8 h-8" />
            <div className="text-center">
              <h1 className="text-xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in below to continue</p>
            </div>
          </div>

          <Skeleton className="w-full h-10" />

          <div className="flex items-center gap-4">
            <hr className="flex-1" />
            <small className="text-muted-foreground text-xs w-fit">
              OR CONTINUE DEMO
            </small>
            <hr className="flex-1" />
          </div>
          <div className="space-y-2">
            <Skeleton className="w-full h-10" />

            <Skeleton className="w-full h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

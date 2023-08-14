"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Loader2, Rocket } from "lucide-react";

const UserAuthForm = () => {
  const [isDemoAdminLoading, setIsDemoAdminLoading] = useState(false);
  const [isDemoNonadminLoading, setIsDemoNonadminLoading] = useState(false);

  const handleDemoAdmin = () => {
    signIn("credentials", {
      email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL,
      password: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD,
      callbackUrl: "/teamspace",
    });
    setIsDemoAdminLoading(true);
  };

  const handleDemoNonadmin = () => {
    signIn("credentials", {
      email: process.env.NEXT_PUBLIC_DEMO_NONADMIN_EMAIL,
      password: process.env.NEXT_PUBLIC_DEMO_NONADMIN_PASSWORD,
      callbackUrl: "/teamspace",
    });
    setIsDemoNonadminLoading(true);
  };

  return (
    <div className="space-y-6 max-w-[350px] mx-auto">
      <div className="flex flex-col gap-2 items-center">
        <Rocket className="w-8 h-8" />
        <div className="text-center">
          <h1 className="text-xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in below to continue</p>
        </div>
      </div>

      <Button
        className="w-full gap-2"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/teamspace",
          })
        }
      >
        <svg
          width="16px"
          height="16px"
          viewBox="-0.5 0 48 48"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Google-color</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g
            id="Icons"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g id="Color-" transform="translate(-401.000000, -860.000000)">
              <g id="Google" transform="translate(401.000000, 860.000000)">
                <path
                  d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                  id="Fill-1"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                  id="Fill-2"
                  fill="#EB4335"
                ></path>
                <path
                  d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                  id="Fill-3"
                  fill="#34A853"
                ></path>
                <path
                  d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                  id="Fill-4"
                  fill="#4285F4"
                ></path>
              </g>
            </g>
          </g>
        </svg>
        Continue with Google
      </Button>

      <div className="flex items-center gap-4">
        <hr className="flex-1" />
        <small className="text-muted-foreground text-xs w-fit">
          OR CONTINUE DEMO
        </small>
        <hr className="flex-1" />
      </div>
      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => handleDemoAdmin()}
          disabled={isDemoAdminLoading || isDemoNonadminLoading}
        >
          {isDemoAdminLoading && (
            <Loader2 className="w-[14px] h-[14px] animate-spin" />
          )}
          As Admin
        </Button>
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => handleDemoNonadmin()}
          disabled={isDemoAdminLoading || isDemoNonadminLoading}
        >
          {isDemoNonadminLoading && (
            <Loader2 className="w-[14px] h-[14px] animate-spin" />
          )}
          As Developer
        </Button>
      </div>
    </div>
  );
};

export { UserAuthForm };

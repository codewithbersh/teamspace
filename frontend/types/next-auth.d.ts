import NextAuth from "next-auth/next";
import { BackendSession } from ".";

declare module "next-auth" {
  interface Session {
    user: {
      name: string | undefined;
      email: string | undefined;
      image: string | undefined;
      backendSession: BackendSession;
    };
  }
}

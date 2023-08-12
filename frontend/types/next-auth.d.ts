import NextAuth from "next-auth/next";
import { User } from ".";

type BackendSession = {
  access: string;
  user: User;
};

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

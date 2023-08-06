import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import {
  getBackendSession,
  getDemoBackendSession,
  updateUserInfo,
} from "./axios/user";
import { BackendSession } from "@/types";

type CredentialsInput = {
  email: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        const user: any = {};
        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ account, credentials, profile }) {
      if (!account) return false;

      if (account.provider === "google" && account.id_token) {
        const backendSession = await getBackendSession({
          token: account.id_token,
        });

        if (!backendSession) {
          return false;
        }

        const picture = (profile as any)?.picture as string | undefined;

        if (!backendSession.user.image_url) {
          const updatedUser = await updateUserInfo({
            token: backendSession.access,
            user: { pk: backendSession.user.pk, image_url: picture },
          });

          account.backendSession = {
            ...backendSession,
            user: {
              ...backendSession.user,
              image_url: picture,
            },
          };
        } else {
          account.backendSession = backendSession;
        }

        return true;
      }

      if (account.provider === "credentials") {
        if (!credentials) return false;
        const { email, password } = credentials as CredentialsInput;
        const backendSession = await getDemoBackendSession({
          email: email,
          password: password,
        });

        if (!backendSession) {
          return false;
        }

        account.backendSession = backendSession;
        return true;
      }

      return false;
    },

    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, {
          backendSession: account.backendSession,
        });
      }
      return { ...token };
    },
    async session({ session, token }) {
      if (session) {
        session.user = {
          ...session.user,
          backendSession: token.backendSession as BackendSession,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

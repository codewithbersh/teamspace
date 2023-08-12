import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import {
  addImageUrltoUser,
  getBackendSession,
  getDemoBackendSession,
  getUserDetails,
} from "./axios/user";
import { BackendSession } from "@/types/next-auth";

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

        const user = await getUserDetails({
          token: backendSession.access,
          userId: backendSession.user.pk,
        });

        if (!user) return false;

        if (!user.image_url && picture) {
          const updatedUser = await addImageUrltoUser({
            token: backendSession.access,
            user: { id: backendSession.user.pk, image_url: picture },
          });

          if (!updatedUser) return false;

          account.backendSession = {
            access: backendSession.access,
            user: updatedUser,
          };
        } else {
          account.backendSession = {
            access: backendSession.access,
            user: user,
          };
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

        const user = backendSession.user as any;

        account.backendSession = {
          access: backendSession.access,
          user: {
            id: user.pk,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          },
        };
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

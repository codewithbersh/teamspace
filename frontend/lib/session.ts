import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";

export async function getCurrentSession() {
  const session = await getServerSession(authOptions);

  return session;
}

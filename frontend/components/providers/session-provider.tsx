import { SessionProvider as SessionProviderNextAuth } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

const SessionProvider = ({ children }: Props) => {
  return <SessionProviderNextAuth>{children}</SessionProviderNextAuth>;
};

export default SessionProvider;

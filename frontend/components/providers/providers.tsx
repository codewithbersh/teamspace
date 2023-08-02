"use client";

import SessionProvider from "./session-provider";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;

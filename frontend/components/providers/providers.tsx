"use client";

import ModalProvider from "./modal-provider";
import MyQueryClientProvider from "./queryclient-provider";
import SessionProvider from "./session-provider";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <MyQueryClientProvider>
        {children}
        <ModalProvider />
      </MyQueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;

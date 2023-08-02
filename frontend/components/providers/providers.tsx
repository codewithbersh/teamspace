"use client";

import ModalProvider from "./modal-provider";
import SessionProvider from "./session-provider";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      {children}
      <ModalProvider />
    </SessionProvider>
  );
};

export default Providers;

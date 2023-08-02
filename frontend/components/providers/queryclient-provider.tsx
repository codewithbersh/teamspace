"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface MyQueryClientProviderProps {
  children: React.ReactNode;
}

const MyQueryClientProvider = ({ children }: MyQueryClientProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default MyQueryClientProvider;

import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared";
import { AuthBootstrapper } from "./auth-bootstrap/AuthBootstrapper";

interface AppProviderProps {
  children?: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrapper />
      {children}
    </QueryClientProvider>
  );
};

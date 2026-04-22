import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared";
import { AuthBootstrapper } from "./auth-bootstrap/AuthBootstrapper";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface AppProviderProps {
  children?: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrapper />
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { pkceService } from "../lib/pkce";
import {
  login,
  logout,
  userKeys,
  useAuthStore,
  type AuthResponse,
  type OAuthExchangeParams,
} from "@/entities/user";

export const useLogin = (): UseMutationResult<
  AuthResponse,
  AxiosError,
  OAuthExchangeParams
> => {
  const queryClient = useQueryClient();
  const setStatus = useAuthStore((state) => state.setStatus);
  const setLoggedOut = useAuthStore((state) => state.setLoggedOut);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.me(), data.user);
      setLoggedOut(false);
      setStatus("authenticated");
      pkceService.clear();
    },
  });
};

export const useLogout = (): UseMutationResult<void, AxiosError, void> => {
  const queryClient = useQueryClient();
  const setStatus = useAuthStore((state) => state.setStatus);
  const setLoggedOut = useAuthStore((state) => state.setLoggedOut);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      setLoggedOut(true);
      setStatus("unauthenticated");
    },
  });
};

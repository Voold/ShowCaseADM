import {useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult, UseQueryResult} from '@tanstack/react-query';
import { authRequests } from './auth.requests';
import { authKeys } from '../config/cacheKeys';
import { pkceService } from '../utils/pkce';
import type { AuthResponse, OAuthExchangeParams } from '../types';
import type { User } from '@/types';
import { AxiosError } from 'axios';

export const authQueries = {
  useMe: (enabled = true): UseQueryResult<User, AxiosError> => {
    return useQuery({
      queryKey: authKeys.me(),
      queryFn: authRequests.getMe,
      retry: false,
      enabled,
      staleTime: Infinity,
    });
  },

  useLogin: (): UseMutationResult<AuthResponse, AxiosError, OAuthExchangeParams> => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: authRequests.login,
      onSuccess: (data) => {
        queryClient.setQueryData(authKeys.me(), data.user);
        pkceService.clear();
      },
    });
  },

  useLogout: (): UseMutationResult<void, AxiosError, void> => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: authRequests.logout,
      onSuccess: () => {
        queryClient.clear();
      },
    });
  }
};
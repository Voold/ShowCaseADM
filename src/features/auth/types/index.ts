import type { User } from '@/types'

export interface OAuthExchangeParams {
  code: string;
  codeVerifier: string;
}

//ANCHOR - Authentication response interface update
export interface AuthResponse {
  user: User;
  accessToken?: string; 
}
import type { User } from "@/entities/user/model/types";

export interface OAuthExchangeParams {
  code: string;
  codeVerifier: string;
}

//ANCHOR - Authentication response interface update
export interface AuthResponse {
  user: User;
  accessToken?: string; 
}
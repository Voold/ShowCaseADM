import type { UserBaseDto } from "../model/types";

export interface OAuthExchangeParams {
  code: string;
  codeVerifier: string;
}

export interface AuthStatusResponse {
  userID: number;
}

export interface GetUsersResponse {
  limit: number;
  offset: number;
  total: number;
  users: UserBaseDto[];
}
export interface OAuthExchangeParams {
  code: string;
  codeVerifier: string;
}

export interface AuthStatusResponse {
  userID: number;
}
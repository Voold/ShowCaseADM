import type { OAuthExchangeParams } from "../types";

const STORAGE_KEYS = {
  CODE_VERIFIER: 'code_verifier',
  STATE: 'oauth_state',
} as const;

class PkceService {
  prepareAuth = async () => {
    const codeVerifier = this.generateRandomString(64);
    sessionStorage.setItem(STORAGE_KEYS.CODE_VERIFIER, codeVerifier);

    const challenge = await this.generateChallenge(codeVerifier);
    const state = this.generateRandomString(32);
    sessionStorage.setItem(STORAGE_KEYS.STATE, state);

    return { challenge, state };
  };

  parseCallback(query: string): OAuthExchangeParams | null {
    const params = new URLSearchParams(query);
    const code = params.get('code');
    const state = params.get('state');
    const savedState = sessionStorage.getItem(STORAGE_KEYS.STATE);
    const codeVerifier = sessionStorage.getItem(STORAGE_KEYS.CODE_VERIFIER);

    if (code && state === savedState && codeVerifier) {
      this.clear();
      return { code, codeVerifier };
    }
    return null;
  }

  clear() {
    sessionStorage.removeItem(STORAGE_KEYS.CODE_VERIFIER);
    sessionStorage.removeItem(STORAGE_KEYS.STATE);
  }

  private generateRandomString(len: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const values = new Uint8Array(len);
    crypto.getRandomValues(values);
    return Array.from(values).map((x) => charset[x % charset.length]).join('');
  }

  private async generateChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
}

export const pkceService = new PkceService();

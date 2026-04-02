export const queryKeys = {
  all: ['auth'] as const,
  me: () => [...queryKeys.all, 'me'] as const,
  user: (id: string) => [...queryKeys.all, 'user', id] as const,
};
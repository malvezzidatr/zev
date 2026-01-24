export const transition = {
  base: '0.3s ease',
} as const;

export type TransitionToken = keyof typeof transition;

export const zIndex = {
  navbar: 1000,
  modal: 2000,
} as const;

export type ZIndexToken = keyof typeof zIndex;

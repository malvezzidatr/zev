export const breakpoints = {
  mobile: '768px',
} as const;

export type BreakpointToken = keyof typeof breakpoints;

export const spacing = {
  section: 'clamp(4rem, 10vh, 8rem)',
  container: 'clamp(1.5rem, 5vw, 6rem)',
  containerMaxWidth: '1400px',
  gapGridDesktop: '4rem',
  gapGridMobile: '3rem',
  gapTags: '0.5rem',
  gapHeader: '1.5rem',
} as const;

export type SpacingToken = keyof typeof spacing;

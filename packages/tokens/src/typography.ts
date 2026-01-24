export const fontFamily = {
  primary: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
} as const;

export const fontSize = {
  display: 'clamp(3rem, 15vw, 12rem)',
  heading: 'clamp(2rem, 5vw, 4.5rem)',
  subheading: 'clamp(1.25rem, 2.5vw, 2rem)',
  body: 'clamp(1rem, 1.2vw, 1.125rem)',
  small: '0.875rem',
  nav: '0.85rem',
} as const;

export const fontWeight = {
  regular: '400',
  bold: '700',
  black: '900',
} as const;

export const letterSpacing = {
  tight: '-0.02em',
  tighter: '-0.03em',
  wide: '0.05em',
  wider: '0.15em',
} as const;

export const lineHeight = {
  display: '0.85',
  heading: '1.0',
  body: '1.6',
  bodyRelaxed: '1.9',
} as const;

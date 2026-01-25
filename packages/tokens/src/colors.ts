export const colors = {
  white: '#FFFFFF',
  black: '#0A0A0A',
  blue: '#0000FF',
  gray: '#F5F5F5',
  grayDark: '#888888',
} as const;

export const colorsSemantic = {
  light: {
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F5F5F5',
    bgInverse: '#0A0A0A',
    textPrimary: '#0A0A0A',
    textSecondary: '#888888',
    textInverse: '#FFFFFF',
    accent: '#0000FF',
  },
  dark: {
    bgPrimary: '#0A0A0A',
    bgSecondary: '#1A1A1A',
    bgInverse: '#141414',
    textPrimary: '#F5F5F5',
    textSecondary: '#AAAAAA',
    textInverse: '#F5F5F5',
    accent: '#4D4DFF',
  },
} as const;

export const colorsDerived = {
  light: {
    cardDefault: 'rgba(255, 255, 255, 0.08)',
    cardHover: 'rgba(255, 255, 255, 0.15)',
    navbarBg: 'rgba(255, 255, 255, 0.95)',
    modalOverlay: 'rgba(0, 0, 0, 0.85)',
    borderSubtle: 'rgba(255, 255, 255, 0.1)',
    borderTag: '#e0e0e0',
    textModalContent: '#444444',
    textModalSecondary: '#555555',
  },
  dark: {
    cardDefault: 'rgba(255, 255, 255, 0.06)',
    cardHover: 'rgba(255, 255, 255, 0.12)',
    navbarBg: 'rgba(10, 10, 10, 0.95)',
    modalOverlay: 'rgba(0, 0, 0, 0.9)',
    borderSubtle: 'rgba(255, 255, 255, 0.1)',
    borderTag: '#333333',
    textModalContent: '#DDDDDD',
    textModalSecondary: '#BBBBBB',
  },
} as const;

export type ColorToken = keyof typeof colors;
export type ColorSemanticToken = keyof typeof colorsSemantic.light;
export type ColorDerivedToken = keyof typeof colorsDerived.light;
export type ColorScheme = 'light' | 'dark';

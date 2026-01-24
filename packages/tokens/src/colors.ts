export const colors = {
  white: '#FFFFFF',
  black: '#0A0A0A',
  blue: '#0000FF',
  gray: '#F5F5F5',
  grayDark: '#888888',
} as const;

export const colorsDerived = {
  cardDefault: 'rgba(255, 255, 255, 0.08)',
  cardHover: 'rgba(255, 255, 255, 0.15)',
  navbarBg: 'rgba(255, 255, 255, 0.95)',
  modalOverlay: 'rgba(0, 0, 0, 0.85)',
  borderSubtle: 'rgba(255, 255, 255, 0.1)',
  borderTag: '#e0e0e0',
  textModalContent: '#444',
  textModalSecondary: '#555',
} as const;

export type ColorToken = keyof typeof colors;
export type ColorDerivedToken = keyof typeof colorsDerived;

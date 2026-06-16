export const COLORS = {
  // Oxford Blue palette (Corrected to Brand Guide)
  oxfordBlue: {
    50: '#f4f6f9',
    100: '#e8ecf2',
    200: '#c5d0e0',
    300: '#94aac7',
    400: '#5c7ba6',
    500: '#182650', // BRAND PRIMARY: Oxford Blue
    600: '#001d40',
    700: '#001937',
    800: '#00132c',
    900: '#000b1d',
  },

  // Coral Red palette (Corrected to Brand Guide)
  coralRed: {
    50: '#fff5f5',
    100: '#ffe3e3',
    200: '#ffc9c9',
    300: '#ffa1a1',
    400: '#ff6b6b',
    500: '#EE445D', // BRAND ACCENT: Coral Red
    600: '#fa3232',
    700: '#e31b1b',
    800: '#be1212',
    900: '#9c0f0f',
  },

  // Secondary Brand Colors (Added from Brand Guide)
  secondary: {
    limeGreen: '#90C73E',
    brightOrange: '#F15928',
    turboSky: '#3EC6F3',
  },

  // Premium Neutrals
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    light: '#F8F9FA',
    border: '#E9ECEF',
    muted: '#6C757D',
    dark: '#212529',
  },

  // Semantic Status
  status: {
    success: '#90C73E', // Updated to match brand Lime Green
    info: '#3EC6F3',    // Updated to match brand Turbo Sky
    warning: '#F15928', // Updated to match brand Bright Orange
    danger: '#EE445D',  // Updated to match brand Coral Red
  }
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const FONTS = {
  // To be loaded in assets/fonts/
  primary: {
    regular: 'NunitoSans-Regular',
    bold: 'NunitoSans-Bold',
    light: 'NunitoSans-Light',
    semiBold: 'NunitoSans-SemiBold',
  },
  display: {
    bold: 'NewScience-Bold',
    regular: 'NewScience-Regular',
  }
};

export const SHADOWS = {
  sm: {
    shadowColor: COLORS.neutral.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: COLORS.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: COLORS.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  }
};
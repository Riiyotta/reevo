// Tokens mapped from the original Tailwind v4 theme (CLONE_SPEC.md section 0).
const semantic = (name) => `rgb(var(--color-${name}) / <alpha-value>)`

const range = (from, to) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i)

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: { sm: '600px', md: '840px', lg: '1140px', xl: '1380px' },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      gray: {
        1: '#f7f7f0', 2: '#f2f2ea', 3: '#e7e7de', 4: '#a8a6a4', 5: '#92918f',
        6: '#7d7b7a', 7: '#676665', 8: '#525151', 9: '#3c3c3c', 10: '#121212',
      },
      yellow: { 1: '#ffffdb', 3: '#fffda7', 5: '#fff47d', 8: '#ffdd4e', 9: '#f8c647', 10: '#efab3e', 12: '#c05822' },
      green: {
        1: '#e8fcf3', 2: '#d9faec', 3: '#bef5dd', 4: '#a4efce', 5: '#8ce8bf', 6: '#74dfaf',
        8: '#54c794', 9: '#49b585', 10: '#38a373', 11: '#2c9364', 13: '#16774b', 15: '#085d37',
      },
      orange: { 1: '#fff0e8', 2: '#fedfce', 3: '#fecfb5', 8: '#fa7b34', 9: '#f96a1a', 13: '#9e2d09' },
      blue: { 1: '#eaf7ff', 2: '#d8efff', 3: '#b4e0ff', 7: '#48a5ff', 8: '#3896fa', 13: '#2b5fc8', 15: '#2044b2' },
      pink: { 1: '#fff1fa', 2: '#ffe2f4', 3: '#fed3ed', 4: '#fcc0e5', 9: '#e36fb6', 11: '#d156a2', 13: '#b64189', 15: '#7f0b50' },
      teal: { 1: '#e3fcff', 2: '#c9f8ff', 4: '#9cecfa', 6: '#77dbec', 8: '#5ac4d6', 9: '#4ab7ca', 13: '#187887', 14: '#10666f', 15: '#0a5257' },
      // Semantic tokens: CSS variables (RGB channels) redefined under `.dark` in index.css
      background: semantic('background'),
      foreground: semantic('foreground'),
      strong: semantic('strong'),
      primary: { DEFAULT: semantic('primary'), foreground: semantic('primary-foreground') },
      'secondary-foreground': semantic('secondary-foreground'),
      'muted-foreground': semantic('muted-foreground'),
      border: semantic('border'),
    },
    fontSize: {
      xs: ['clamp(.75rem,.699rem + .2041vw,.875rem)', { lineHeight: '115%', letterSpacing: '-.01em' }],
      sm: ['clamp(.875rem,.824rem + .2041vw,1rem)', { lineHeight: '135%', letterSpacing: '0' }],
      md: ['clamp(1rem,.949rem + .2041vw,1.125rem)', { lineHeight: '135%', letterSpacing: '0' }],
      lg: ['clamp(1.125rem,1.074rem + .2041vw,1.25rem)', { lineHeight: '135%', letterSpacing: '0' }],
      xl: ['clamp(1.5rem,1.2449rem + 1.0204vw,2.125rem)', { lineHeight: '115%', letterSpacing: '-.01em' }],
      '2xl': ['clamp(1.75rem,1.3929rem + 1.4286vw,2.625rem)', { lineHeight: '105%', letterSpacing: '-.01em' }],
      '3xl': ['clamp(2.25rem,1.7398rem + 2.0408vw,3.5rem)', { lineHeight: '105%', letterSpacing: '-.02em' }],
      'display-xs': ['12px', { lineHeight: '115%', letterSpacing: '0' }],
      'display-md': ['clamp(.875rem,.824rem + .2041vw,1rem)', { lineHeight: '105%', letterSpacing: '.15em' }],
      'display-lg': ['clamp(1.125rem,1.074rem + .2041vw,1.25rem)', { lineHeight: '115%', letterSpacing: '-.02em' }],
      'display-lg-2': ['clamp(1.25rem,1.0969rem + .6122vw,1.625rem)', { lineHeight: '110%', letterSpacing: '-.02em' }],
      'display-xl': ['clamp(1.5rem,1.2959rem + .8163vw,2rem)', { lineHeight: '105%', letterSpacing: '-.02em' }],
      'display-2xl': ['clamp(3rem,2.2857rem + 2.8571vw,4.75rem)', { lineHeight: '80%', letterSpacing: '-.01em' }],
      'display-3xl': ['clamp(3.5939rem,2.1729rem + 5.6842vw,7.0755rem)', { lineHeight: '80%', letterSpacing: '-.01em' }],
    },
    fontFamily: {
      sans: ['Haltung', '"Haltung Fallback"', 'system-ui', 'sans-serif'],
      heading: ['Metrify', '"Metrify Fallback"', 'sans-serif'],
      mono: ['GTAmericaMono', '"GTAmericaMono Fallback"', 'Consolas', 'monospace'],
    },
    borderRadius: {
      none: '0',
      xs: '.125rem',
      DEFAULT: 'var(--radius)',
      sm: '.25rem',
      lg: '.5rem',
      '2xl': '1rem',
      full: '9999px',
    },
    extend: {
      height: {
        'nav-mobile': 'var(--nav-height-mobile)',
        'nav-desktop': 'var(--nav-height-desktop)',
        button: 'var(--button-height)',
        'button-sm': 'var(--button-height-sm)',
      },
      inset: {
        'nav-mobile': 'var(--nav-height-mobile)',
        'nav-desktop': 'var(--nav-height-desktop)',
      },
      gridTemplateColumns: { 24: 'repeat(24, minmax(0, 1fr))' },
      gridColumn: Object.fromEntries(range(13, 24).map((n) => [`span-${n}`, `span ${n} / span ${n}`])),
      gridColumnStart: Object.fromEntries(range(14, 25).map((n) => [n, String(n)])),
      boxShadow: {
        diffused:
          '176px 308px 142px 0 rgba(0,0,0,.01), 99px 174px 120px 0 rgba(0,0,0,.05), 44px 77px 89px 0 rgba(0,0,0,.09), 11px 19px 49px 0 rgba(0,0,0,.10)',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-100%)' } },
      },
      animation: { marquee: 'marquee 51.8333s linear infinite' },
      transitionTimingFunction: { DEFAULT: 'cubic-bezier(.4,0,.2,1)' },
    },
  },
  plugins: [],
}

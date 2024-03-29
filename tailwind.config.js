module.exports = {
  prefix: 'pg-',
  important: false,
  separator: ':',
  theme: {
    screens: {
      'mobile-max': { max: '640px' },
      'tablet-max': { max: '768px' },
      'laptop-max': { max: '1023px' },
      mobile: { min: '320px', max: '639px' },
      tablet: { min: '640px', max: '767px' },
      laptop: { min: '768px', max: '1023px' },
      desktop: { min: '1024px', max: '1279px' },
      lgDesktop: { min: '1280px' }
    },
    colors: {
      transparent: 'transparent',

      black: '#000',
      white: '#fff',

      body: 'rgba(248, 248, 248, 0.82)',

      gray: {
        000: '#f7f7f7',
        100: '#f6f7f8',
        200: '#f9fbfc',
        300: '#f1f2f3',
        400: '#dfdfdf',
        500: '#cfcfcf',
        600: '#9b9b9b',
        700: '#737373',
        800: '#4a4a4a',
        900: '#1a202c'
      },
      red: {
        100: '#fff5f5',
        200: '#fed7d7',
        300: '#feb2b2',
        400: '#fc8181',
        500: '#ff4747',
        600: '#e53e3e',
        700: '#c53030',
        800: '#9b2c2c',
        900: '#742a2a'
      },
      orange: {
        100: '#fffaf0',
        200: '#feebc8',
        300: '#fbd38d',
        400: '#f6ad55',
        500: '#ed8936',
        600: '#dd6b20',
        700: '#c05621',
        800: '#9c4221',
        900: '#7b341e'
      },
      yellow: {
        100: '#fffff0',
        200: '#fefcbf',
        300: '#fae68e',
        400: '#f5cd23',
        500: '#ecc94b',
        600: '#d69e2e',
        700: '#b7791f',
        800: '#975a16',
        900: '#744210'
      },
      green: {
        100: '#f0fff4',
        200: '#c6f6d5',
        300: '#9ae6b4',
        400: '#21d352',
        500: '#48bb78',
        600: '#38a169',
        700: '#2f855a',
        800: '#276749',
        900: '#22543d'
      },
      teal: {
        100: '#e6fffa',
        200: '#b2f5ea',
        300: '#81e6d9',
        400: '#4fd1c5',
        500: '#38b2ac',
        600: '#319795',
        700: '#2c7a7b',
        800: '#285e61',
        900: '#234e52'
      },
      blue: {
        100: '#ebf8ff',
        200: '#bee3f8',
        300: '#90cdf4',
        400: '#4b9cfd',
        500: '#2476ff',
        600: '#3182ce',
        700: '#2b6cb0',
        800: '#2c5282',
        900: '#2a4365'
      },
      indigo: {
        100: '#ebf4ff',
        200: '#c3dafe',
        300: '#a3bffa',
        400: '#7f9cf5',
        500: '#667eea',
        600: '#5a67d8',
        700: '#4c51bf',
        800: '#434190',
        900: '#3c366b'
      },
      purple: {
        100: '#faf5ff',
        200: '#e9d8fd',
        300: '#d6bcfa',
        400: '#b794f4',
        500: '#9f7aea',
        600: '#805ad5',
        700: '#6b46c1',
        800: '#553c9a',
        900: '#44337a'
      },
      pink: {
        100: '#fff5f7',
        200: '#fed7e2',
        300: '#fbb6ce',
        400: '#f687b3',
        500: '#ed64a6',
        600: '#d53f8c',
        700: '#b83280',
        800: '#97266d',
        900: '#702459'
      }
    },
    spacing: {
      px: '1px',
      sidebar: '260px',
      '2p': '0.125rem',
      '5p': '0.3125rem',
      '6p': '0.375rem',
      '8p': '0.5rem',
      '10p': '0.625rem',
      '11p': '0.6875rem',
      '13p': '0.8125rem',
      '14p': '0.875rem',
      '15p': '0.9375rem',
      '18p': '1.125rem',
      '19p': '1.1875rem',
      '21p': '1.3125rem',
      '22p': '1.375rem',
      '23p': '1.4375rem',
      '30p': '1.875rem',
      '34p': '2.125rem',
      '35p': '2.1875rem',
      '37p': '2.3125rem',
      '46p': '2.875rem',
      '60p': '3.75rem',
      '70p': '4.375rem',
      '72p': '4.5rem',
      '140p': '8.75rem',
      '200p': '12.5rem',
      full: '100%',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '32': '8rem',
      '40': '10rem',
      '48': '12rem',
      '56': '14rem',
      '64': '16rem'
    },
    backgroundColor: theme => theme('colors'),
    backgroundPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top'
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain'
    },
    borderColor: theme => ({
      ...theme('colors'),
      default: theme('colors.gray.300', 'currentColor')
    }),
    borderRadius: {
      none: '0',
      sm: '0.1875rem',
      default: '0.25rem',
      lg: '0.5rem',
      full: '9999px'
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
      '8': '8px'
    },
    boxShadow: {
      default: '0 1px 3px 0 rgba(0, 0, 0, 0.15)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      none: 'none',
      header: '0 2px 0 0 rgba(0, 0, 0, 0.05)'
    },
    container: {},
    cursor: {
      auto: 'auto',
      default: 'default',
      pointer: 'pointer',
      wait: 'wait',
      text: 'text',
      move: 'move',
      'not-allowed': 'not-allowed'
    },
    fill: {
      current: 'currentColor'
    },
    flex: {
      '1': '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none'
    },
    flexGrow: {
      '0': '0',
      default: '1'
    },
    flexShrink: {
      '0': '0',
      default: '1'
    },
    fontFamily: {
      vThin: '"vazir-thin"',
      vRegular: '"vazir-regular"',
      vLight: '"vazir-light"',
      vMedium: '"vazir-medium"',
      vBold: '"vazir-bold"',
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
    },
    fontSize: {
      xxs:	'0.625rem', //10px
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem'
    },
    fontWeight: {
      hairline: '100',
      thin: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    height: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh',
      header: '70px',
      RSheader: '80px'
    }),
    inset: {
      '0': '0',
      auto: 'auto',
      '2p': '0.125rem',
      '10p': '0.625rem',
      '30p': '1.875rem',
      '40p': '2.5rem',
      '72p': '4.5rem',
      '80p': '5rem',
      '-260': '-16.25rem'
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2'
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal'
    },
    margin: (theme, { negative }) => ({
      auto: 'auto',
      ...theme('spacing'),
      ...negative(theme('spacing'))
    }),
    maxHeight: {
      full: '100%',
      screen: '100vh'
    },
    maxWidth: {
      xs: '20rem',
      sm: '24rem',
      md: '28rem',
      lg: '32rem',
      xl: '36rem',
      '2xl': '42rem',
      '3xl': '48rem',
      '4xl': '56rem',
      '5xl': '64rem',
      '6xl': '72rem',
      full: '100%'
    },
    minHeight: {
      '0': '0',
      full: '100%',
      screen: '100vh'
    },
    minWidth: {
      '0': '0',
      full: '100%'
    },
    objectPosition: {
      bottom: 'bottom',
      center: 'center',
      left: 'left',
      'left-bottom': 'left bottom',
      'left-top': 'left top',
      right: 'right',
      'right-bottom': 'right bottom',
      'right-top': 'right top',
      top: 'top'
    },
    opacity: {
      '0': '0',
      '25': '0.25',
      '50': '0.5',
      '75': '0.75',
      '99': '0.99',
      '100': '1'
    },
    order: {
      first: '-9999',
      last: '9999',
      none: '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
      '10': '10',
      '11': '11',
      '12': '12'
    },
    padding: theme => theme('spacing'),
    stroke: {
      current: 'currentColor'
    },
    textColor: theme => theme('colors'),
    width: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      '1/2': '50%',
      '1/3': '33.33333%',
      '2/3': '66.66667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.66667%',
      '2/6': '33.33333%',
      '3/6': '50%',
      '4/6': '66.66667%',
      '5/6': '83.33333%',
      '1/12': '8.33333%',
      '2/12': '16.66667%',
      '3/12': '25%',
      '4/12': '33.33333%',
      '5/12': '41.66667%',
      '6/12': '50%',
      '7/12': '58.33333%',
      '8/12': '66.66667%',
      '9/12': '75%',
      '10/12': '83.33333%',
      '11/12': '91.66667%',
      full: '100%',
      screen: '100vw'
    }),
    zIndex: {
      auto: 'auto',
      '0': '0',
      '10': '10',
      '20': '20',
      '30': '30',
      '40': '40',
      '50': '50',
      '1000': '1000'
    }
  },
  variants: {
    alignContent: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColor: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: ['responsive'],
    borderColor: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive'],
    boxShadow: ['responsive', 'hover', 'focus'],
    cursor: ['responsive'],
    display: ['responsive'],
    fill: ['responsive'],
    flex: ['responsive'],
    flexDirection: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    flexWrap: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive'],
    fontSize: ['responsive'],
    fontSmoothing: ['responsive'],
    fontStyle: ['responsive'],
    fontWeight: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    inset: ['responsive'],
    justifyContent: ['responsive'],
    letterSpacing: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    objectFit: ['responsive'],
    objectPosition: ['responsive'],
    opacity: ['responsive'],
    order: ['responsive'],
    outline: ['responsive', 'focus'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    stroke: ['responsive'],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover', 'focus'],
    textDecoration: ['responsive', 'hover', 'focus'],
    textTransform: ['responsive'],
    userSelect: ['responsive', 'hover', 'focus'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    wordBreak: ['responsive'],
    zIndex: ['responsive']
  },
  corePlugins: {
    userSelect: false
  },
  plugins: [
    function({ addComponents, theme }) {
      addComponents({
        '.btn': {
          position: 'relative',
          fontFamily: theme('fontFamily.vMedium'),
          fontSize: theme('fontSize.sm'),
          border: 0,
          cursor: theme('cursor.pointer'),
          borderRadius: theme('borderRadius.sm'),

          /* btn tyes */

          /* default */
          '&.btnDefault100': {
            boxShadow: theme('boxShadow.default'),
            background: '#e0dfdf',
            color: theme('colors.gray.800')
          },
          '&.btnDefault50': {
            boxShadow: theme('boxShadow.default'),
            background: 'linear-gradient(to top, #e0dfdf, #f2f0f0)',
            color: theme('colors.gray.800')
          },
          '&.btnDefault0': {
            boxShadow: theme('boxShadow.default'),
            background: 'linear-gradient(to top, #f7f7f7, #fff)',
            color: theme('colors.gray.800')
          },
          '&.btnDefaultOutline': {
            background: 'linear-gradient(to top, #f7f7f7, #fff)',
            color: theme('colors.gray.800'),
            border: '1px solid theme("colors.gray.400")'
          },

          /* primary */
          '&.btnPrimary100': {
            boxShadow: theme('boxShadow.default'),
            background: '#1c7cef',
            color: theme('colors.white')
          },
          '&.btnPrimary50': {
            boxShadow: theme('boxShadow.default'),
            background: 'linear-gradient(to top, #1c7cef, #4192f3)',
            color: theme('colors.white')
          },
          '&.btnPrimary0': {
            boxShadow: theme('boxShadow.default'),
            background: 'linear-gradient(to top, #2686f9, theme("colors.blue.400"))',
            color: theme('colors.white')
          },
          '&.btnPrimaryOutline': {
            background: theme('colors.white'),
            color: '#4a90e2',
            border: '1px solid theme("colors.blue.400")'
          },

          /* secondary */
          '&.btnSecondary': {
            background: theme('colors.gray.300'),
            color: '#b3bcc5',
            border: '1px solid "#e5e7e9"'
          },

          /* success */
          '&.btnSuccess100': {
            background: '#25cc69',
            color: theme('colors.white')
          },
          '&.btnSuccess50': {
            boxShadow: theme('boxShadow.default'),
            background: 'linear-gradient(to top, #25cc69, #30db72)',
            color: theme('colors.white')
          },
          '&.btnSuccess0': {
            boxShadow: theme('boxShadow.default'),
            background: 'linear-gradient(to top, #2fd673, #3ae57c)',
            color: theme('colors.white')
          },
          '&.btnSuccessOutline': {
            background: 'rgba(33, 211, 82, 0.1)',
            color: theme('colors.green.400'),
            border: '1px solid theme("#colors.green.400")'
          },

          /* danger */
          '&.btnDanger100': {
            boxShadow: theme('boxShadow.default'),
            background: '#ef3f1c',
            color: theme('colors.white')
          },
          '&.btnDanger50': {
            boxShadow: theme('boxShadow.default'),
            background: 'linear-gradient(to top, #ef3f1c, #f36141)',
            color: theme('colors.white')
          },
          '&.btnDanger0': {
            boxShadow: theme('boxShadow.default'),
            background: 'linear-gradient(to top, #f94926, #fd6b4b)',
            color: theme('colors.white')
          },
          '&.btnDangerOutline': {
            background: 'rgba(255, 71, 71, 0.1)',
            color: theme('colors.red.500'),
            border: '1px solid theme("colors.red.500")'
          },

          /* warning */
          '&.btnWarning100': {
            boxShadow: theme('boxShadow.default'),
            background: '#e8b51d',
            color: theme('colors.white')
          },
          '&.btnWarning50': {
            boxShadow: theme('boxShadow.default'),
            background: 'linear-gradient(to top, #e8b51d, #eec13b)',
            color: theme('colors.white')
          },
          '&.btnWarning0': {
            boxShadow: theme('boxShadow.default'),
            background: 'linear-gradient(to top, #f2bf27, #f8cb45)',
            color: theme('colors.white')
          },
          '&.btnDisabled': {
            border: '1px solid #e5e7e9',
            background: theme('colors.gray-300'),
            color: '#b3bcc5',
            borderRadius: '3px',
            backgroundColor: '#f1f2f3',
            pointerEvents: 'none'
          },

          /* with extra radius */
          '&.btnPill': {
            borderRadius: theme('borderRadius-full')
          },

          '&.btnCircle': {
            width: '50px',
            height: '50px',
            borderRadius: theme('borderRadius-full')
          },

          /* example: next and previous btn */
          '&.btnControl': {
            background: '#aeb0ba',
            color: theme('colors.white')
          },

          /* btn sizes */
          '&.btnSm': {
            width: '70px',
            height: '35px',
            lineHeight: '35px'
          },
          '&.btnMd': {
            width: '120px',
            height: '25px',
            lineHeight: '25px'
          },
          '&.btnLg': {
            width: '200px',
            height: '35px',
            lineHeight: '35px'
          },
          '&.btnVlg': {
            width: '222px',
            height: '50px',
            lineHeight: '50px'
          },

          '&:disabled': {
            cursor: theme('cursor.auto')
          }
        }
      })
    }
  ]
}

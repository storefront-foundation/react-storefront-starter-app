import createTheme from 'react-storefront/theme/createTheme'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    RSFMenuHeader: {
      root: {
        padding: 0,
      },
    },
  },
})

export default theme

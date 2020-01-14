import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
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
  zIndex: {
    modal: 999,
    amp: {
      modal: 2147483646,
    },
  },
  headerHeight: 64,
  loadMaskOffsetTop: 64 + 56 + 4,
  drawerWidth: 330,
  margins: {
    container: 16,
  },
  overrides: {},
})

export default theme

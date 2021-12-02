import createTheme from 'react-storefront/theme/createTheme'
import { red } from '@mui/material/colors'
import { adaptV4Theme } from '@mui/material/styles'

const theme = createTheme(
  adaptV4Theme({
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
    overrides: {},
  })
)

export default theme

import createTheme from 'react-storefront/theme/createTheme'
import { adaptV4Theme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

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
    components: {},
  })
)

export default theme

import { createTheme, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

type Props = {
  children: React.ReactNode
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#14FFEC',
    },
    secondary: {
      main: '#1df468',
    },
    text: {
      primary: '#d7faf6',
    },
    customTheme: {
      background: '#212121',
      navbar: '#3e3e3e',
      paper: '#3e3e3e',
      card: '#1a6567',
      button: '#14FFEC',
    },
  },
  typography: {
    fontFamily: 'Kanit',
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: {
            variant: 'contained',
          },
          style({ theme }) {
            return {
              backgroundColor: theme.palette.customTheme.button,
              color: theme.palette.customTheme.paper,
              transition: 'all ease 0.2s',
              '&:hover': {
                opacity: 0.8,
                backgroundColor: theme.palette.customTheme.button,
              },
              '&:disabled': {
                color: '#d7faf69e',
              },
            }
          },
        },
      ],
    },
  },
})

const ThemeContext = ({ children }: Props) => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  )
}

export default ThemeContext

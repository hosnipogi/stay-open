import { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { UserContext } from 'providers/UserContext'

const Appbar = () => {
  const { authIsLoading, signInWithGoogle, signOut, user } =
    useContext(UserContext)

  const handleSignIn = () => {
    signInWithGoogle()
  }

  const handleSignOut = () => {
    signOut()
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: 'customTheme.navbar' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          color="primary"
        >
          {user.email}
        </Typography>
        {user.email ? (
          <Button onClick={handleSignOut} variant="contained">
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSignIn}
            disabled={authIsLoading}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Appbar

import { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { UserContext } from 'providers/UserContext'

const Appbar = () => {
  const { signInWithGoogle, signOut, user } = useContext(UserContext)

  const handleSignIn = () => {
    signInWithGoogle()
  }

  const handleSignOut = () => {
    signOut()
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user.email}
        </Typography>
        {user.email ? (
          <Button color="inherit" onClick={handleSignOut}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={handleSignIn}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Appbar

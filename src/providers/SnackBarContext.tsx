import React, { createContext, useEffect, useState } from 'react'
import { AlertColor } from '@mui/material/Alert'
import SnackBarComponent from 'components/Snackbar'

type Props = {
  children: React.ReactNode
}

interface ISnackBar {
  displaySnackbar: (message: string, severity?: AlertColor) => void
}

export const SnackBarContext = createContext<ISnackBar>({} as ISnackBar)

export const SnackBarProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false)
  const [sbMessage, setSnackbarMessage] = useState('')
  const [sbSeverity, setSnackbarSeverity] = useState<AlertColor>('error')

  useEffect(() => {
    function closeOnWindowClick() {
      handleClose('clickaway')
    }
    window.addEventListener('click', closeOnWindowClick)

    return () => window.removeEventListener('click', closeOnWindowClick)
  }, [])

  const handleSnackbarOpen = () => {
    setOpen(true)
  }

  const handleClose = (reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const displaySnackbar: ISnackBar['displaySnackbar'] = (
    message,
    severity = 'success'
  ) => {
    handleSnackbarOpen()
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
  }

  const snackBarValues: ISnackBar = {
    displaySnackbar,
  }

  return (
    <SnackBarContext.Provider value={snackBarValues}>
      <SnackBarComponent
        message={sbMessage}
        open={open}
        handleClose={handleClose}
        severity={sbSeverity}
      />
      {children}
    </SnackBarContext.Provider>
  )
}

export default SnackBarProvider

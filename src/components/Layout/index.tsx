import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Navbar from 'components/Navbar'

type Props = {
  children: React.ReactNode
}
const index = ({ children }: Props) => (
  <Box sx={{ backgroundColor: 'customTheme.background' }}>
    <Navbar />
    <Container
      disableGutters
      maxWidth="lg"
      sx={{ minHeight: 'calc(100vh - 64px)', height: '100%', py: 10 }}
    >
      {children}
    </Container>
  </Box>
)

export default index

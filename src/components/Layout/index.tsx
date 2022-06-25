import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Navbar from 'components/Navbar'

type Props = {
  children: React.ReactNode
}
const index = ({ children }: Props) => (
  <Box sx={{ pb: 7 }}>
    <Navbar />
    <Container disableGutters maxWidth="lg" sx={{ minHeight: '62vh', mt: 10 }}>
      {children}
    </Container>
  </Box>
)

export default index

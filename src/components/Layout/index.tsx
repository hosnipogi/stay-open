import React from 'react'
import Container from '@mui/material/Container'

type Props = {
  children: React.ReactNode
}
const index = ({ children }: Props) => (
  <Container disableGutters maxWidth="lg">
    {children}
  </Container>
)

export default index

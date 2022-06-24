import React from 'react'
import Layout from 'components/Layout'
import AddTodo from 'components/AddTodo'
import Container from  '@mui/material/Container'
import TodoList from 'components/TodoList'

function App() {
  return (
    <Layout>
      <Container disableGutters maxWidth="sm">
        <AddTodo />
        <TodoList />
      </Container>
    </Layout>
  )
}

export default App

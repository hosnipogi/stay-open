import React from 'react'
import Layout from 'components/Layout'
import AddTodo from 'components/AddTodo'
import Paper from '@mui/material/Paper'
import TodoList from 'components/TodoList'

function App() {
  return (
    <Layout>
      <Paper
        elevation={10}
        sx={{
          width: 'min(100% - 60px, 640px)',
          p: 4,
          marginInline: 'auto',
          backgroundColor: 'customTheme.paper',
          borderRadius: 3,
        }}
      >
        <AddTodo />
        <TodoList />
      </Paper>
    </Layout>
  )
}

export default App

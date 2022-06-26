import { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { TodoContext } from 'providers/TodoContext'
import { TodoStatus } from 'types'

const TodoList = () => {
  const { todos, editTodo, loading, deleteTodo } = useContext(TodoContext)
  const [sortedTodo, setSortedTodo] = useState(todos)

  useEffect(() => {
    if (!loading) {
      const t = [...todos].sort((a, b) => {
        const first = a.status === TodoStatus.INPROGRESS ? 0 : 1
        const second = b.status === TodoStatus.INPROGRESS ? 0 : 1

        return first - second
      })
      setSortedTodo(t)
    }
  }, [todos, loading])

  if (loading) {
    return (
      <>
        <Divider sx={{ my: 2 }} />
        <Stack
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Typography variant="h6" align="center" color="primary.main">
            Loading
          </Typography>
          <CircularProgress size={24} thickness={4} />
        </Stack>
      </>
    )
  }

  return (
    <Stack gap={3} mt={4}>
      {sortedTodo.map((todo) => {
        const isCompleted = todo.status === TodoStatus.COMPLETE
        return (
          <Card
            variant="elevation"
            elevation={3}
            key={todo.id}
            sx={{ p: 5, backgroundColor: 'customTheme.card', borderRadius: 2 }}
          >
            <Stack
              flexDirection="row"
              alignContent="center"
              justifyContent="space-between"
              gap={2}
            >
              <Box>
                <Typography
                  sx={{
                    textDecoration: isCompleted ? 'line-through' : 'none',
                  }}
                  color={isCompleted ? 'primary' : 'default'}
                  variant="h6"
                  fontWeight={600}
                >
                  {todo.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color={isCompleted ? 'primary' : 'default'}
                >
                  Date Created: {new Date(todo.dateCreated).toLocaleString()}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color={isCompleted ? 'primary' : 'default'}
                >
                  Last Updated:{' '}
                  {new Date(todo.dateLastUpdated).toLocaleString()}
                </Typography>
                <Chip
                  size="small"
                  label={isCompleted ? 'Completed' : 'In Progress'}
                  variant="outlined"
                  color={isCompleted ? 'secondary' : 'default'}
                  sx={{ mt: 2 }}
                />
              </Box>
              <Stack gap={2} alignItems="center">
                <Box>
                  <Checkbox
                    checked={isCompleted}
                    color="primary"
                    onClick={() => editTodo(todo.id)}
                  />
                </Box>
                <Button onClick={() => deleteTodo(todo.id)}>
                  <DeleteForeverIcon height={5} />
                </Button>
              </Stack>
            </Stack>
          </Card>
        )
      })}
    </Stack>
  )
}

export default TodoList

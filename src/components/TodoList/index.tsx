import { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
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
      <Typography variant="h6" align="center" color="primary.main" mt={2}>
        Loading...
      </Typography>
    )
  }

  return (
    <Stack gap={2} mt={4}>
      {sortedTodo.map((todo) => (
        <Card variant="outlined" key={todo.id} sx={{ p: 5 }}>
          <Stack
            flexDirection="row"
            alignContent="center"
            justifyContent="center"
            gap={2}
          >
            <Box>
              <Checkbox
                checked={todo.status === TodoStatus.COMPLETE}
                color="primary"
                style={{ marginRight: 5 }}
                onClick={() => editTodo(todo.id)}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  textDecoration:
                    todo.status === TodoStatus.COMPLETE
                      ? 'line-through'
                      : 'none',
                }}
              >
                {todo.title}
              </Typography>
              <Typography>
                Date Created: {new Date(todo.dateCreated).toUTCString()}
              </Typography>
              <Typography>
                Last Updated: {new Date(todo.dateLastUpdated).toUTCString()}
              </Typography>
              <Typography>
                Status:{' '}
                {todo.status === TodoStatus.COMPLETE
                  ? 'Completed'
                  : 'In Progress'}
              </Typography>
            </Box>
            <Box>
              <Button onClick={() => deleteTodo(todo.id)}>
                <DeleteForeverIcon height={5} />
              </Button>
            </Box>
          </Stack>
        </Card>
      ))}
    </Stack>
  )
}

export default TodoList

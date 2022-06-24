import { useContext, useState, ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Add } from '@mui/icons-material'
import { TodoContext } from 'providers/TodoContext'

const TodoComponent = () => {
  const { addTodo } = useContext(TodoContext)
  const [text, setText] = useState('')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setText(e.target.value)

  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo(text)
    setText('')
  }

  return (
    <Box>
      <form onSubmit={createTodo}>
        <FormControl fullWidth>
          <TextField
            label="Add Todo"
            variant="standard"
            onChange={handleChange}
            required
            value={text}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 5 }}
            type="submit"
          >
            <Add />
            Add
          </Button>
        </FormControl>
      </form>
    </Box>
  )
}

export default TodoComponent

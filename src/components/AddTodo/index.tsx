import { useContext, useState, ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Add } from '@mui/icons-material'
import { TodoContext } from 'providers/TodoContext'
import { UserContext } from 'providers/UserContext'

const AddTodoComponent = () => {
  const { addTodo } = useContext(TodoContext)
  const { signInWithGoogle, isLoggedIn } = useContext(UserContext)
  const [text, setText] = useState('')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setText(e.target.value)

  const handleSignIn = () => {
    signInWithGoogle()
  }

  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo(text)
    setText('')
  }

  return (
    <Box>
      {isLoggedIn ? (
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
      ) : (
        <Box sx={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 5 }}
            type="submit"
            onClick={handleSignIn}
            fullWidth={true}
          >
            Sign in with Google to add TODOs!
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default AddTodoComponent

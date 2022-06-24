import { createContext, useState, useEffect } from 'react'
import { TodoStatus, TodoType } from 'types'

interface ITodo {
  todos: TodoType[]
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
  addTodo: (title: string) => void
  editTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

type Props = {
  children: React.ReactNode
}

export const TodoContext = createContext<ITodo>({} as ITodo)

export const TodoProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<TodoType[]>([])

  const toggleStatus = (status: TodoStatus) => {
    return status === TodoStatus.COMPLETE
      ? TodoStatus.INPROGRESS
      : TodoStatus.COMPLETE
  }

  useEffect(() => {
    console.log({ todos })
    // load todo list form api
  }, [todos])

  const addTodo: ITodo['addTodo'] = (title) => {
    const newTodo: TodoType = {
      id: String((Math.random() * 999).toFixed(0)),
      title: title.trim(),
      dateCreated: new Date().getTime(),
      dateLastUpdated: new Date().getTime(),
      status: TodoStatus.INPROGRESS,
    }

    setTodos([...todos, newTodo])
  }

  const editTodo: ITodo['editTodo'] = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.status = toggleStatus(todo.status)
          todo.dateLastUpdated = new Date().getTime()
        }
        return todo
      })
    )
  }

  const deleteTodo: ITodo['deleteTodo'] = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const TodoContextValue: ITodo = {
    todos,
    setTodos,
    addTodo,
    editTodo,
    deleteTodo,
  }

  return (
    <TodoContext.Provider value={TodoContextValue}>
      {children}
    </TodoContext.Provider>
  )
}

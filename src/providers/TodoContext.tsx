import { createContext, useState, useEffect } from 'react'
import { TodoStatus, TodoType } from 'types'
import { useMutation, useQuery, gql } from '@apollo/client'

interface ITodo {
  todos: TodoType[]
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
  loading?: boolean
  error: any
  addTodo: (title: string) => void
  editTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

type Props = {
  children: React.ReactNode
}

const FETCH_TODOS = gql`
  query Todos {
    todos {
      id
      status
      title
      dateLastUpdated
      dateCreated
    }
  }
`

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      dateCreated
      dateLastUpdated
    }
  }
`

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!) {
    updateTodo(id: $id) {
      status
      dateLastUpdated
    }
  }
`

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`

export const TodoContext = createContext<ITodo>({} as ITodo)

export const TodoProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<TodoType[]>([])

  const { loading, error, data } = useQuery<{ todos: TodoType[] }>(FETCH_TODOS)
  const [createTodo] = useMutation(ADD_TODO)
  const [updateTodo] = useMutation(UPDATE_TODO)
  const [destroyTodo] = useMutation(DELETE_TODO)

  useEffect(() => {
    if (!loading && !error) {
      setTodos(data!.todos)
    }
  }, [data, loading, error])

  const addTodo: ITodo['addTodo'] = async (title) => {
    const { data } = (await createTodo({
      variables: {
        title,
      },
    })) as any

    const newTodo: TodoType = {
      id: data.addTodo.id,
      title: title.trim(),
      dateCreated: data.addTodo.dateCreated * 1000,
      dateLastUpdated: data.addTodo.dateLastUpdated * 1000,
      status: TodoStatus.INPROGRESS,
    }

    setTodos([...todos, newTodo])
  }

  const editTodo: ITodo['editTodo'] = async (id) => {
    const { data } = (await updateTodo({
      variables: {
        id,
      },
    })) as any

    const updatedTodos = todos.map<TodoType>((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: data.updateTodo.status,
          dateLastUpdated: data.updateTodo.dateLastUpdated * 1000,
        }
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  const deleteTodo: ITodo['deleteTodo'] = async (id) => {
    const deleted = await destroyTodo({
      variables: { id },
    })
    if (deleted) {
      setTodos(todos.length === 1 ? [] : todos.filter((todo) => todo.id !== id))
    }
  }

  const TodoContextValue: ITodo = {
    todos,
    setTodos,
    loading,
    error,
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

import { gql } from '@apollo/client'

export const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      dateCreated
      dateLastUpdated
    }
  }
`

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!) {
    updateTodo(id: $id) {
      status
      dateLastUpdated
    }
  }
`

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`

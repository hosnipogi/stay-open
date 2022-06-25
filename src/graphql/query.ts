import { gql } from '@apollo/client'

export const FETCH_TODOS = gql`
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

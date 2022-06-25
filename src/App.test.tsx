import { render, screen } from '@testing-library/react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { TodoProvider } from 'providers/TodoContext'
import { FETCH_TODOS } from 'graphql/query'
import { TodoType, TodoStatus } from 'types'
import TodoList from 'components/TodoList'

const mocks: MockedResponse<{ todos: TodoType[] }> = {
  request: {
    query: FETCH_TODOS,
  },
  result: {
    data: {
      todos: [
        {
          id: '1234',
          title: 'Test Todo',
          dateCreated: new Date().getTime(),
          dateLastUpdated: new Date().getTime(),
          status: TodoStatus.COMPLETE,
        },
      ],
    },
  },
}

describe('<TodoProvider />', () => {
  it('renders without error', async () => {
    render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </MockedProvider>
    )

    await screen.findAllByText('Loading...')
    await screen.findAllByText('Test Todo')
  })
})

import { TodoProvider } from './TodoContext'
import { UserProvider } from './UserContext'
import ApolloProvider from './ApolloClient'

type Props = {
  children: React.ReactNode
}

const Index = ({ children }: Props) => {
  return (
    <ApolloProvider>
      <UserProvider>
        <TodoProvider>{children}</TodoProvider>
      </UserProvider>
    </ApolloProvider>
  )
}

export default Index

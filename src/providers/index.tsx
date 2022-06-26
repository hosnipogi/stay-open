import { TodoProvider } from './TodoContext'
import { UserProvider } from './UserContext'
import ApolloProvider from './ApolloClient'
import SnackBarProvider from './SnackBarContext'

type Props = {
  children: React.ReactNode
}

const Index = ({ children }: Props) => {
  return (
    <ApolloProvider>
      <SnackBarProvider>
        <UserProvider>
          <TodoProvider>{children}</TodoProvider>
        </UserProvider>
      </SnackBarProvider>
    </ApolloProvider>
  )
}

export default Index

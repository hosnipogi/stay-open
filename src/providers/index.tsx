import { TodoProvider } from './TodoContext'
import { UserProvider } from './UserContext'
import ApolloProvider from './ApolloClient'
import ThemeProvider from './ThemeContext'
import SnackBarProvider from './SnackBarContext'

type Props = {
  children: React.ReactNode
}

const Index = ({ children }: Props) => {
  return (
    <ApolloProvider>
      <ThemeProvider>
        <SnackBarProvider>
          <UserProvider>
            <TodoProvider>{children}</TodoProvider>
          </UserProvider>
        </SnackBarProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default Index

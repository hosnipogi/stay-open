import { TodoProvider } from './TodoContext'
import ApolloProvider from './ApolloClient'

type Props = {
  children: React.ReactNode
}

const Index = ({ children }: Props) => {
  return (
    <ApolloProvider>
      <TodoProvider>{children}</TodoProvider>
    </ApolloProvider>
  )
}

export default Index

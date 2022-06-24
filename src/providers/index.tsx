import { TodoProvider } from './TodoContext'

type Props = {
  children: React.ReactNode
}

const Index = ({ children }: Props) => {
  return <TodoProvider>{children}</TodoProvider>
}

export default Index

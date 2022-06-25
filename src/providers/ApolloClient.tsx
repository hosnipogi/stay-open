import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_HOST,
  cache: new InMemoryCache(),
})

type Props = {
  children: React.ReactNode
}

const Apollo = ({ children }: Props) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)

export default Apollo

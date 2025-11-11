import { auth } from '@/libs';
import { from } from '@apollo/client';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : null;

  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export * from './types';
export * from './queries';
export * from './mutations';

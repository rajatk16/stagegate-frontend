import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  headers: {
    authorization: `Bearer ${localStorage.getItem('access_token') || ''}`,
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export * from './mutations';

import { auth } from '@/libs';
import { ApolloLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const fetchFirebaseToken = async (): Promise<string | null> => {
  const currentUser = auth.currentUser;

  if (!currentUser) return null;

  try {
    const token = await currentUser.getIdToken(false);
    return token;
  } catch (error) {
    console.error('Failed to get token: ', error);
    try {
      const token = await currentUser.getIdToken(true);
      return token;
    } catch (refreshError) {
      console.error('Failed to refresh token: ', refreshError);
      return null;
    }
  }
};

const authLink = new SetContextLink(async (prevContext) => {
  try {
    const token = await fetchFirebaseToken();
    return {
      headers: {
        ...prevContext.headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  } catch (error) {
    console.error('Auth header setup failed: ', error);
    return { headers: prevContext.headers };
  }
});

const link = ApolloLink.from([authLink.concat(httpLink)]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export * from './mutations';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { getPreviewHeaders } from "./prime";

const httpLink = new HttpLink({
  uri: new URL(global.___graphqlUniversal.prime.url),
  fetch,
});

const withToken = setContext(async (input, b) => {
  return {
    headers: await getPreviewHeaders(),
  };
});

const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});


export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, withToken, httpLink]),
  cache: new InMemoryCache()
});
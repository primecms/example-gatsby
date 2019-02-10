import React from 'react';
import { getIsolatedQuery } from 'gatsby-source-graphql-universal';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

const httpLink = new HttpLink({
  uri: new URL(global.___graphqlUniversal.prime.url),
  fetch,
});

const withToken = setContext(async (input, b) => {
  return {
    headers: await getPreviewHeaders(),
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});


export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, withToken, httpLink]),
  cache: new InMemoryCache()
});

export const getPreviewHeaders = async () => {
  const query = window.location.search
    .substr(1)
    .split('&')
    .reduce((acc, item) => {
      const [key, value] = item.split('=').map(decodeURIComponent);
      acc[key] = value;
      return acc;
    }, {});

  if (query.hasOwnProperty('prime.id')) {
    const url = new URL(global.___graphqlUniversal.prime.url);
    url.pathname = '/prime/preview';
    url.search = `?id=${query['prime.id']}`;
    const res = await fetch(url, { credentials: 'include' }).then(r => r.json());
    localStorage.setItem('x-prime-token', res.accessToken);
    localStorage.setItem('x-prime-preview', res.document.id);
  }

  if (localStorage.getItem('x-prime-token')) {
    return {
      'x-prime-token': localStorage.getItem('x-prime-token'),
      'x-prime-preview': localStorage.getItem('x-prime-preview'),
    };
  }

  return null;
}

export const isPreview = () => {
  return !!localStorage.getItem('x-prime-token');
}

export const clearPreview = () => {
  localStorage.removeItem('x-prime-token');
  localStorage.removeItem('x-prime-preview');
  window.location.reload();
}

export const usePreview = (props, query) => {
  const [data, setData] = React.useState(props.data);
  // React.useEffect(() => {
  //   client.query({
  //     query: getIsolatedQuery(query, 'prime', 'Prime'),
  //     variables: props.pathContext,
  //   })
  //   .then(({ data: prime }) => setData({ prime }))
  // }, []);

  return data;
}
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { isPreviewing, PrimeLink } from "apollo-link-prime";
import { getIsolatedQuery } from "gatsby-source-graphql-universal";
import React from "react";

export const client = new ApolloClient({
  link: PrimeLink({
    url: "https://example-prime.herokuapp.com"
  }),
  cache: new InMemoryCache()
});

export const usePreview = (props, query) => {
  const [data, setData] = React.useState(props.data);
  React.useEffect(() => {
    if (isPreviewing()) {
      client
        .query({
          query: getIsolatedQuery(query, "prime", "Prime"),
          variables: props.pageContext
        })
        .then(({ data: prime }) => setData({ prime }));
    }
  }, []);

  return data;
};

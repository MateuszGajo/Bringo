import withApollo from "next-with-apollo";
import { InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { GRAPHQL_URL } from "../../configs";

const httpLink = createHttpLink({
  uri: GRAPHQL_URL
});

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache().restore(initialState || {})
    })
);

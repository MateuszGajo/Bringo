import withApollo from 'next-with-apollo';
import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { GRAPHQL_URL } from '../../configs';
import { setContext } from 'apollo-link-context';
import cookies from 'next-cookies';

const createLink = (ctx)=>{
  const {token} = cookies(ctx);

  const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token,
      }
    }
  });

  return authLink.concat(httpLink)
}

export default withApollo(
  ({ ctx, headers, initialState }) =>

    new ApolloClient({
      link: createLink(ctx),
      cache: new InMemoryCache().restore(initialState || {})
    })
);




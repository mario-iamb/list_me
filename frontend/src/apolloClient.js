// import {createBatchingNetworkInterface, ApolloClient} from 'apollo-client';

// export const apolloClient = new ApolloClient({
//   networkInterface: createBatchingNetworkInterface({
//     uri: 'http://localhost:8080/graphql'
//   }),
//   connectToDevTools: true
// })

import ApolloClient from 'apollo-boost'

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
})
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql/typedefs';
import { resolvers } from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

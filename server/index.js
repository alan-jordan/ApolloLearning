const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

const server = new ApolloServer({ typeDefs, resolvers });



const app = express();

app.use(express.static(path.join(__dirname, '../dist')))
server.applyMiddleware({ app });

const PORT = process.env.PORT || 3000;

app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
);
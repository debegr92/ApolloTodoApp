const { ApolloServer } = require('apollo-server');
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const Database = require("./datasources/Database");

// Database configuration
var knexConfig = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./database.sqlite"
  },
  useNullAsDefault: true
});

// you can also pass a knex instance instead of a configuration object
const db = new Database(knexConfig);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ db }),
  tracing: true,  // Only for development/debugging
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
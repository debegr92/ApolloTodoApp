const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    todos: [Todo]
    todo(id:ID!): Todo
  }

  type Mutation {
    addTodo(text:String!): Int!
    removeTodo(id:ID!): [Todo]
  }

  type Todo {
    id: ID!
    text: String!
  }
`;

module.exports = typeDefs;
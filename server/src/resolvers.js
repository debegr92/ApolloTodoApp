
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
// This object is called 'resolver map'
// https://www.apollographql.com/docs/apollo-server/data/resolvers/
// https://www.apollographql.com/docs/tutorial/resolvers/#write-mutation-resolvers
// https://graphql.org/graphql-js/mutations-and-input-types/
// https://medium.com/paypal-engineering/graphql-resolvers-best-practices-cd36fdbcef55
const resolvers = {
    Query: {
        todos: async (_source, { }, { dataSources }) => {
            return temp = await dataSources.db.getTodos();
        },

        todo: async (_source, { id }, { dataSources }) => {
            var temp = await dataSources.db.getTodoById(id);
            return temp[0];
        },
    },
    Mutation: {
        addTodo: async (_source, { text }, { dataSources }) => {
            var temp = await dataSources.db.addTodo(text);
            return temp[0];
        },

        removeTodo: async (_source, { id }, { dataSources }) => {
            await dataSources.db.removeTodo(id);
            return await dataSources.db.getTodos();
        },
    },
};

module.exports = resolvers;
/*
Database connector
SQLDataSource: https://github.com/cvburgess/SQLDataSource
Knex: https://knexjs.org/
*/

const { SQLDataSource } = require("datasource-sql");

class MyDatabase extends SQLDataSource {
    // QUERY

    getTodos() {
        return this.knex
        .select("*")
        .from("todos");
    }

    getTodoById(id) {
        return this.knex
        .select("*")
        .from("todos")
        .where({ id: id })
        .limit(1);
    }

    // MUTATION
    
    addTodo(text) {
        return this.knex("todos").insert({
            text:text
        });
    }

    removeTodo(id) {
        return this.knex("todos")
        .where("id", id)
        .del();
    }
}

module.exports = MyDatabase;
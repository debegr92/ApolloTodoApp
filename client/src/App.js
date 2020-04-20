import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from "apollo-boost";

const TODOS = gql`
  query{
    todos {
      id
      text
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text)
  }
`;

const REMOVE_TODO = gql`
  mutation removeTodo($id: ID!) {
    removeTodo(id: $id){
      id
      text
    }
  }
`;

function App() {
  // States
  const [todoText, setTodoText] = useState("");
  // GraphQL/Apollo
  const [addTodo] = useMutation(ADD_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);
  const { loading, error, data, refetch } = useQuery(TODOS);

  {/* Define component parts with conditional rendering */}
  const load = (loading === true ? <p>Loading ToDo's...</p> : "");
  const err = (error === true ? <p>Error while loading ToDo's :(</p> : "");
  const dat = ((data?.todos.length > 0) ? <table><tbody>{data?.todos.map(({ id, text }) => (
    <tr key={id}>
      <td><input type="checkbox" onChange={(e) => 
        removeTodo({ variables: { id: e.target.value } }).then(refetch())
      } id={id} name={id} value={id}/></td>
      <td><p>{text}</p></td>
    </tr>
  ))}</tbody></table> : <p><b>Yeah! You have no ToDo's!</b></p> )

  return (
    <div>
      <h1>My ToDo's</h1>
      {/* Pre-defined objects */}
      {load}
      {err}
      {dat}

      {/* Add form to add new todos */}
      <form onSubmit={e => {
              e.preventDefault();
              addTodo({ variables: { text: todoText } }).then(refetch());
              setTodoText("");
            }}>
        <label>
          New ToDo:
        <input type="text" name="todoText" value={todoText} onChange={(e) => setTodoText(e.target.value)}/>
        </label>
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
   const [todo, setTodo] = useState();

   async function getTodoList() {
      const response = await fetch('http://localhost:8000/todos');
      const data = await response.json();
      setTodo(data.todos);
   }

   useEffect(() => {
      console.log(todo);
      getTodoList();
   }, []);

   return (
      <AuthContext.Provider
         value={{
            todo: todo,
            setTodo: setTodo,
            getTodoList,
         }}
      >
         {props.children}
      </AuthContext.Provider>
   );
};

export default AuthContext;

import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
   todo: [],
});

export const AuthContextProvider = (props) => {
   const [todo, setTodo] = useState([]);

   async function getTodoList() {
      const response = await fetch('http://localhost:8000/todos');
      const data = await response.json();
      setTodo(data);
      console.log(todo);
   }

   // useEffect(() => {
   //    getTodoList();
   // }, []);

   return (
      <AuthContext.Provider value={{ todo: todo, getTodoList }}>
         {props.children}
      </AuthContext.Provider>
   );
};

export default AuthContext;

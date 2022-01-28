import React, { useState } from 'react';

const AuthContext = React.createContext({
   todo: '',
});

export const AuthContextProvider = (props) => {
   const [todo, setTodo] = useState('Hejsan Hallo');

   async function getTodoList() {
      const response = await fetch('http://localhost:8000/todos');
      const data = await response.json();
      setTodo(data);
      console.log(todo);
   }

   return (
      <AuthContext.Provider value={{ todo: todo, getTodoList }}>
         {props.children}
      </AuthContext.Provider>
   );
};

export default AuthContext;

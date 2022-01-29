import React, { useContext, useEffect } from 'react';
import TodolistItemCard from './TodolistItemCard';
import AuthContext from '../context/Context';

function TodoListItems() {
   const { todo } = useContext(AuthContext);

   return (
      <div>
         <h1>här ska alla todos mappas ut</h1>
         {todo &&
            todo.map((todos) => <TodolistItemCard key={todos.id} {...todos} />)}
      </div>
   );
}

export default TodoListItems;

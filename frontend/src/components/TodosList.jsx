import React, { useState, useContext } from 'react';
import AuthContext from '../context/Context';

import styled from 'styled-components';

function TodosList() {
   const [addTodoItem, setAddTodoItem] = useState('');
   const { setTodo } = useContext(AuthContext);

   async function addTodoHandler(e) {
      e.preventDefault();
      if (addTodoItem === '') {
         console.log('Please enter something');
      } else {
         const response = await fetch('http://localhost:8000/insert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               title: addTodoItem.trim(),
            }),
         });
         setAddTodoItem('');
         const data = await response.json();
         console.log(data);
         setTodo((todos) => [...todos, data.todo]);
      }
   }

   return (
      <TodoListWrapper>
         <form onSubmit={addTodoHandler}>
            <input
               onChange={(e) => setAddTodoItem(e.target.value)}
               value={addTodoItem}
               type="title"
               placeholder="New Todo"
            />
         </form>
         <button onClick={addTodoHandler}>Add new todo</button>
      </TodoListWrapper>
   );
}

const TodoListWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   align-content: center;
   border: 1px solid whitesmoke;
   height: 150px;
   padding: 1rem;
   background-color: #f5f5f55c;
   border-radius: 55px;
   margin: 9px;

   form {
      width: 70%;
   }
   input {
      width: 100%;
      height: 3rem;
      border: none;
      border-radius: 5px;
      font-size: 25px;
      text-align: center;
      outline: none;
      color: #0202026c;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
         rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
         rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
   }

   button {
      width: 70%;
      height: 3rem;
      margin-top: 1rem;
      border: none;
      border-radius: 5px;
      background-color: #ff9ff3;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
         rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
         rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
   }
`;

export default TodosList;

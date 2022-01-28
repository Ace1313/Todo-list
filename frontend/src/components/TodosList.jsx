import React, { useContext, useRef } from 'react';
import AuthContext from '../context/Context';
import styled from 'styled-components';

function TodosList() {
   const { addTodo, setAddTodo } = useContext(AuthContext);
   const inputRef = useRef(null);

   async function addTodoHandler(e) {
      e.preventDefault();
      if (addTodo === '') {
         console.log('Please enter something');
      } else {
         const response = await fetch('http://localhost:8000/insert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               title: addTodo.trim(),
            }),
         });
         inputRef.current.value = '';
         const data = await response.json();
         console.log(data);
      }
   }

   return (
      <TodoListWrapper>
         <form>
            <input
               onChange={(e) => setAddTodo(e.target.value)}
               value={addTodo}
               type="title"
               placeholder="New Todo"
               ref={inputRef}
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
   }
`;

export default TodosList;

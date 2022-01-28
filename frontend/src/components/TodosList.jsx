import React, { useContext } from 'react';
import AuthContext from '../context/Context';
import styled from 'styled-components';

function TodosList() {
   const context = useContext(AuthContext);
   return (
      <TodoListWrapper>
         <form>
            <input type="title" placeholder="New Todo" />
         </form>
         <button>Add new todo</button>
      </TodoListWrapper>
   );
}

const TodoListWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   border: 1px solid whitesmoke;
   width: 55%;
   height: 150px;
   margin: auto;
   padding: 1rem;

   input {
      height: 2rem;
      width: 900px;
      border: none;
      border-radius: 5px;
   }

   button {
      width: 900px;
      height: 2rem;
      margin-top: 1rem;
      border: none;
      border-radius: 5px;
      background-color: #ff9ff3;
      cursor: pointer;
   }
`;

export default TodosList;

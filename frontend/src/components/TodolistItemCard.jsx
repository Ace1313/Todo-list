import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/Context';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

function TodolistItemCard(props) {
   const { setTodo, todo } = useContext(AuthContext);
   const [checkbox, setCheckbox] = useState(false);
   console.log(checkbox);

   async function deleteTodoHandler(id) {
      const response = await fetch(`http://localhost:8000/delete/${id}`, {
         method: 'DELETE',
      });
      const data = await response.json();
      if (data.success === true) {
         console.log('removed');
         console.log(data);
         setTodo(todo.filter((item) => item.id !== id));
      }
   }

   function checkboxHandler(e) {
      setCheckbox(!checkbox);
   }

   return (
      <CardWrapper>
         <h3 className={checkbox ? 'checkbox' : ''}> {props.title} </h3>
         <label>
            <input
               checked={checkbox}
               onChange={(e) => checkboxHandler(e)}
               type="checkbox"
            />
         </label>
         <button onClick={() => deleteTodoHandler(props.id)}>
            <FaTrash />
         </button>
      </CardWrapper>
   );
}

const CardWrapper = styled.li`
   list-style: none;
   padding: 0.8rem;

   width: 50%;
   display: grid;
   grid-template-columns: 1fr 20px 20px;
   justify-items: center;
   border-radius: 5px;
   box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

   button {
      background-color: transparent;
      border: none;
      padding: 0.3rem;
      font-size: 18px;
   }
   label {
      align-self: center;
      padding-right: 10px;
   }

   .checkbox {
      text-decoration: line-through;
      text-decoration-thickness: 3px;
   }
`;

export default TodolistItemCard;

import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/Context';
import styled from 'styled-components';

function TodolistItemCard(props) {
   const { setTodo, todo } = useContext(AuthContext);

   console.log(props);

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

   return (
      <CardWrapper>
         <h3> {props.title} </h3>
         <button onClick={() => deleteTodoHandler(props.id)}>Delete</button>
      </CardWrapper>
   );
}

const CardWrapper = styled.li`
   list-style: none;
   padding: 0.8rem;
   border: 1px solid black;
   width: 80%;
   display: grid;
   justify-items: center;
   border-radius: 5px;
`;

export default TodolistItemCard;

import React, { useContext, useState, useEffect, useRef } from 'react';
import AuthContext from '../context/Context';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import { AiTwotoneEdit } from 'react-icons/ai';

function TodolistItemCard(props) {
   const { setTodo, todo, getTodoList } = useContext(AuthContext);
   const [checkbox, setCheckbox] = useState(props.completed);
   const [updateTodo, setUpdateTodo] = useState('');
   const [toggleInput, setToggleInput] = useState(false);
   const inputRef = useRef();

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

   async function editTodoHandler(id) {
      if (updateTodo === '') {
         return console.log('Noo');
      } else {
         const response = await fetch(`http://localhost:8000/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               title: updateTodo.trim(),
            }),
         });
         const data = await response.json();

         setUpdateTodo((todo) => [...todo], data.values[0]);
      }
      inputRef.current.value = '';
      setToggleInput(false);
   }

   function toggleInputHandler() {
      setToggleInput(!toggleInput);
   }

   async function checkboxHandler() {
      const response = await fetch(
         `http://localhost:8000/setCompleted/${props.id}`,
         {
            method: 'PUT',
         }
      );
      setCheckbox(!checkbox);
   }

   useEffect(() => {
      setCheckbox(props.completed);
   }, [props.completed]);

   useEffect(() => {
      getTodoList();
   }, [updateTodo]);

   return (
      <CardWrapper>
         <h3 className={checkbox ? 'checkbox' : ''}> {props.title} </h3>
         {toggleInput && (
            <div className="edit_todo">
               <input
                  className="edit_todo"
                  onChange={(e) => setUpdateTodo(e.target.value)}
                  type="text"
                  ref={inputRef}
               />
               <button
                  className="edit_btn"
                  onClick={() => editTodoHandler(props.id)}
               >
                  {toggleInput ? 'Ok' : ''}
               </button>
            </div>
         )}
         <label>
            <input
               defaultChecked={props.completed}
               onChange={() => checkboxHandler()}
               type="checkbox"
            />
         </label>
         <button className="btn-icon" onClick={() => deleteTodoHandler(props.id)}>
            <FaTrash />
         </button>
         <button className="btn-icon" onClick={toggleInputHandler}>
            <AiTwotoneEdit />
         </button>
      </CardWrapper>
   );
}

const CardWrapper = styled.li`
   .edit_todo {
      grid-row-start: 2;
      grid-column-start: 1;
      border: none;
      border-radius: 5px;
      text-align: center;
      outline: none;
      color: #0202026c;
      height: 1.3rem;
      width: 55%;
   }

   list-style: none;
   padding: 0.8rem;
   width: 55%;
   height: 7rem;
   display: grid;
   grid-template-columns: 1fr 20px 20px 20px;
   grid-template-rows: 1fr 1fr;
   justify-items: center;
   border-radius: 5px;
   box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 61, 0.35) 0px -2px 6px 0px inset;

   .btn-icon {
      background-color: transparent;
      border: none;
      padding: 0.3rem;
      font-size: 18px;
      cursor: pointer;
   }

   .edit_btn {
      border: none;
      border-radius: 5px;
      background-color: #ff9ff3;
      cursor: pointer;
      padding: 0.3rem;
      margin-left: 0.5rem;
   }
   label {
      align-self: center;
      padding-right: 10px;
   }

   .checkbox {
      text-decoration: line-through;
      text-decoration-thickness: 3px;
      text-decoration-color: red;
   }

   @media screen and (max-width: 600px) {
      width: 100%;

      .edit_todo {
         min-width: 85%;
      }
   }
`;

export default TodolistItemCard;

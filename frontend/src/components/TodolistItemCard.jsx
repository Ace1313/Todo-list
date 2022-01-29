import React from 'react';

function TodolistItemCard(props) {
   return (
      <div>
         <h2> {props.title} </h2>
         <button>Delete</button>
      </div>
   );
}

export default TodolistItemCard;

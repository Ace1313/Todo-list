const db = require('./DB.js');

async function getAllTodos() {
   try {
      const query = 'SELECT * FROM todolist ORDER BY "createdAt"';
      const data = await db.query(query);
      const todos = data.rows;
      return todos;
   } catch (error) {
      console.log(error);
   }
}

async function getOneTodo(todoId) {
   try {
      const query = 'SELECT * FROM todolist WHERE id = $1';
      const data = await db.query(query, [todoId]);
      const todo = data.rows[0];

      if (data.rowCount === 0) throw new Error('Todlist not found');

      const { createdAt, ...rest } = todo;

      return rest;
   } catch (error) {
      console.log(error);
   }
}

module.exports = getAllTodos;
module.exports = getOneTodo;

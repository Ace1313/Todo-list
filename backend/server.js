const { config } = require('dotenv');
const express = require('express');
const cors = require('cors');
require('dotenv/config');
config();

const { Pool } = require('pg');
const app = express();
app.use(cors());
app.use(express.json());

const db = new Pool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_SOURCE,
});

app.get('/', async (req, res) => {
   const query = `
    CREATE TABLE todolist (
        id SERIAL PRIMARY KEY,
        title VARCHAR(65) NOT NULL
        
    )
    `;
   await db.query(query);
   return res.json({ success: true });
});

//completed boolean DEFAULT false

app.get('/todos', async (req, res) => {
   try {
      const query = 'SELECT * FROM todolist ORDER BY "createdAt"';
      const data = await db.query(query);
      const todos = data.rows;
      return res.json({ success: true, todos });
   } catch (error) {
      console.log(error);
   }
});

app.post('/insert', async (req, res) => {
   try {
      const { title } = req.body;
      const query = `INSERT INTO todolist (title)
        VALUES ($1) RETURNING* 
        `;
      const values = [title];
      const data = await db.query(query, values);

      return res.json({ success: true, todo: data.rows[0] });
   } catch (error) {
      console.log(error);
   }
});

app.get('/todos/:id', async (req, res) => {
   try {
      const todoId = req.params.id;
      const query = 'SELECT * FROM todolist WHERE id = $1';
      const data = await db.query(query, [todoId]);
      const todo = data.rows[0];

      if (data.rowCount === 0) throw new Error('Todlist not found');

      return res.json({ success: true, todo });
   } catch (error) {
      console.log(error);
   }
});

app.put('/update/:id', async (req, res) => {
   try {
      const todoId = req.params.id;

      const query = 'SELECT * FROM todolist WHERE id = $1';
      const data = await db.query(query, [todoId]);

      if (data.rowCount === 0) throw new Error('List not found');

      const { title } = req.body;

      const updatedQuery = `
   UPDATE todolist
   SET title = $1 WHERE id = $2
   `;

      const values = [title, todoId];
      await db.query(updatedQuery, values);
      return res.json({ success: true, values });
   } catch (error) {
      console.log(error);
   }
});

app.put('/setCompleted/:id', async (req, res) => {
   try {
      const todoId = req.params.id;

      const query = 'SELECT * FROM todolist WHERE id = $1';
      const data = await db.query(query, [todoId]);

      const completed = !data.rows[0].completed;

      if (data.rowCount === 0) throw new Error('List not found');

      const updatedQuery = `
   UPDATE todolist
   SET completed = $1 WHERE id = $2
   `;

      const values = [completed, todoId];
      await db.query(updatedQuery, values);
      return res.json({ success: true });
   } catch (error) {
      console.log(error);
   }
});

app.delete('/delete/:id', async (req, res) => {
   try {
      const todoId = req.params.id;

      const query = 'SELECT * FROM todolist WHERE id = $1';

      const data = await db.query(query, [todoId]);

      if (data.rowCount === 0) throw new Error('List with id not found');

      await db.query('DELETE FROM todolist WHERE id = $1', [todoId]);

      return res.json({ success: true, message: 'Todlist deleted' });
   } catch (error) {
      return res.json({ success: false, message: 'Todolist not found' });
   }
});

app.listen(8000, () => {
   console.log('Server Started at port...');
});

const { config } = require('dotenv');
const express = require('express');
require('dotenv/config');
config();

const { Pool } = require('pg');
const app = express();
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
        title VARCHAR(20) NOT NULL,
        todos VARCHAR(55) NOT NULL
    )
    `;
   await db.query(query);
   return res.json({ success: true });
});

app.post('/insert', async (req, res) => {
   try {
      const { title, todos } = req.body;
      const query = `INSERT INTO todolist (title, todos)
        VALUES ($1, $2) RETURNING* 
        `;
      const values = [title, todos];
      const data = await db.query(query, values);

      return res.json({ success: true, todo: data.rows[0] });
   } catch (error) {
      console.log(error);
   }
});

app.listen(8000, () => {
   console.log('Server Started at port...');
});

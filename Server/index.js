import "dotenv/config";
import express from "express";
import cors from "cors";
import pg from "pg";
const { Pool } = pg;
//middlewares
const app = express();
app.use(express.json());
app.use(cors());
//postgres connection
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

//todo get
app.get("/todos", async (request, response) => {
  try {
    const result = await pool.query("SELECT * FROM todolist");
    response.json(result.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//todo post
app.post("/todos", async (request, response) => {
  try {
    const result = await pool.query(
      "INSERT INTO todolist (todo_item) VALUES ($1) RETURNING *",
      [request.body.todo_item]
    );
    response.json(result.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//todo put
app.put("/todo/:id", async (request, response) => {
  try {
    const result = await pool.query(
      "UPDATE todolist SET todo_item =$1 WHERE id=$2 RETURNING *",
      [request.body.todo_item, request.params.id]
    );
    response.json(result.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//todo delete
app.delete("/todo/:id", async (request, response) => {
  try {
    await pool.query("DELETE FROM todolist WHERE id=$1", [request.params.id]);
    response.json({ status: "sucess" });
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is up and running......");
});

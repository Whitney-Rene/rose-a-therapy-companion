//the syntax for the dotenv was incorrect causing an issue with readability of env variables
//I also did not need config() on line 12
import "dotenv/config";
import express from "express";
import cors from "cors";

import db from "./db/db-connection.js";
import { hashPassword } from "./utils/hashPasswordUtils.js";

const app = express();
const PORT = process.env.PORT || 8888;

//middleware
app.use(cors());
app.use(express.json());

//simple get request to homepage
app.get("/", (req, res) => {
  res.json("nuevo comienzo");
});

//endpoint to see users in db
app.get("/users", async (req, res) => {
  try {
    const { rows: users } = await db.query("SELECT * FROM users");
    res.send(users);
  } catch (error) {
    console.error("Error in Database Query:", error);
    //500-requests was fine, but there is an issue with server
    res.status(500).json({ error });
  }
});

//endpoint to see entries in db
//query parameter /:count/:userId == /entries/5/1
//search, more than one query parameter, ?count=5&userID=1
app.get("/entries", async (req, res) => {
  try {
    const { rows: entries } = await db.query("SELECT * FROM entries");
    res.send(entries);
  } catch (error) {
    console.error("Error in Database Query:", error);
    res.status(500).json({ error });
  }
});

//call to third party api
app.get("/quotes", async (req, res) => {
  try {
    const response = await fetch("https://www.affirmations.dev");
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//endpoint for adding users to db
app.post("/add-users", async (req, res) => {
  try {
    //object destructuring
    const { user_name, user_email, user_password } = req.body;
    const hashedUserPassword = hashPassword(user_password);
    const result = await db.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [user_name, user_email, hashedUserPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error });
  }
});

//endpoint for adding entries to db
// `:` indicates route parameter
app.post("/add-entries/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { entry_type, entry_date, entry_content } = req.body;
    const result = await db.query(
      "INSERT INTO entries (entry_type, entry_date, entry_content, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [entry_type, entry_date, entry_content, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error });
  }
});

//endpoint to update user information
app.patch("/edit-users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { user_name, user_email, user_password } = req.body;

    // const newhashedUserPassword = hashPassword(user_password);

    const result = await db.query(
      "UPDATE users SET user_name=$1, user_email=$2, user_password=$3 WHERE user_id=$4 RETURNING *",
      [user_name, user_email, user_password, user_id]
    );
    res.status(400).json(result.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error });
  }
});

app.patch("/edit-entries/:entry_id", async (req, res) => {
  try {
    const { entry_id } = req.params;
    const { entry_type, entry_date, entry_content } = req.body;

    const result = await db.query(
      "UPDATE entries SET entry_type=$1, entry_date=$2, entry_content=$3 WHERE entry_id=$4 RETURNING *",
      [entry_type, entry_date, entry_content, entry_id]
    );
    res.status(400).json(result.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error });
  }
});

app.delete("/delete-entries/:entry_id", async (req, res) => {
  try {
    const { entry_id } = req.params;
    const result = await db.query(
      "DELETE FROM entries WHERE entry_id=$1 RETURNING *",
      [entry_id]
    );
    res.status(200).send("Entry successfully deleted.");
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error });
  }
});

//port listening
app.listen(PORT, () => {
  console.log(`Estoy escuchando en port ${PORT}`);
});

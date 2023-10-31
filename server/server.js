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
    return res.status(500).json({ error });
  }
});

//endpoint to see entries in db
app.get("/entries", async (req, res) => {
  try {
    const { rows: entries } = await db.query("SELECT * FROM entries");
    res.send(entries);
  } catch (error) {
    console.error("Error in Database Query:", error);
    return res.status(500).json({ error });
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
app.post("/addusers", async (req, res) => {
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
    console.log(error);
    return res.status(400).json({ error });
  }
});

// INSERT INTO entries (
//   entry_type,
//   entry_date,
//   entry_content,
//   user_id
// );
// VALUES (
// 'rose',
// '2023-10-25',
// 'I was feeling anxious. I opened the calm app, and use the 3 min breath timer. I took a deep breaths',
// 1
// );

//endpoint for adding entries to db
app.post("/addentries", async (req, res) => {
  try {
    const { }
  }
})

//add post, put/patch and delete endpoints

//port listening?
app.listen(PORT, () => {
  console.log(`Estoy escuchando en port ${PORT}`);
});

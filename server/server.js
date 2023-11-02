//the syntax for the dotenv was incorrect causing an issue with readability of env variables
//I also did not need config() on line 12
import "dotenv/config";
import express from "express";
import cors from "cors";

import db from "./db/db-connection.js";
import { hashPassword } from "./utils/hashPasswordUtils.js";

const app = express();
const PORT = process.env.PORT || 8888;

//FUTURE PLANS:
//do I need all these routes?  am I using them all?

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
    res.json({ error });
    // if (res.status === 500 ) {

    // } else if (res.status === 400) {
    //   res.status(400).json({ error });
    // }
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

//endpoint to query db for the lastest entries, limit 5
app.get("/list-latest-entries/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { rows: ffentries } = await db.query(
      "SELECT * FROM entries WHERE user_id=$1 ORDER BY entry_date DESC LIMIT 5",
      [user_id]
    );
    res.send(ffentries);
  } catch (error) {
    console.error("Error in Database Query:", error);
    // res.status(500).json({ error });
    res.json({ error });
  }
});

//endpoint to query db for entries between specific dates
app.get("/date-specific-entries/:start_date/:end_date", async (req, res) => {
  try {
    const { start_date, end_date } = req.params;
    const { rows: dsentries } = await db.query(
      "SELECT *FROM entries WHERE entry_date BETWEEN $1 AND $2",
      [start_date, end_date]
    );
    res.send(dsentries);
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

//endpoint to update user information by user_id
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

//endpoint to edit entry by entry_id
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

//endpoint to delete a user by user_id
app.delete("/delete-users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    //necessary to first delete entries related to user, since there are references to the user in the entries table
    //a foreign key constraint in the "entries" table that enforces referential integrity
    //you cannot delete a user if there are related records in the "entries" table that depend on that use
    await db.query("DELETE FROM entries WHERE user_id = $1", [user_id]);

    const result = await db.query(
      "DELETE FROM users WHERE user_id=$1 RETURNING *",
      [user_id]
    );
    res.status(200).send("User successfully deleted.");
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error });
  }
});

//endpoint to delete an entry by entry_id
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

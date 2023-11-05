import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

import db from "./db/db-connection.js";
import { hashPassword } from "./utils/hashPasswordUtils.js";

const app = express();
const PORT = process.env.PORT || 8888;

//FUTURE PLANS:
//do I need all these routes?  am I using them all?
//for security reasons, not a good idea to have "hanging" routes
//could inject queries in the routes and cause issues through thrid party software - learn about protecting routes??

//middleware
app.use(cors());
app.use(express.json());

//simple get request to homepage
app.get("/", (req, res) => {
  res.json("nuevo comienzo");
});

//endpoint to see users in db
//500-requests was fine, but there is an issue with server
app.get("/users", async (req, res) => {
  try {
    const { rows: users } = await db.query("SELECT * FROM users");
    res.send(users);
  } catch (error) {
    console.error("Error in Database Query:", error);
    res.json({ error });
  }
});

//endpoint to see entries in db
app.get("/entries", async (req, res) => {
  try {
    const { rows: entries } = await db.query("SELECT * FROM entries");
    res.send(entries);
  } catch (error) {
    console.error("Error in Database Query:", error);
    res.json({ error });
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
    res.json({ error });
  }
});

//call to third party api
app.get("/quotes", async (req, res) => {
  try {
    const response = await fetch("https://www.affirmations.dev");
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error("Error with quotes api:", error);
    res.json({ error });
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
    console.error("Error adding user to database:", error);
    res.json({ error });
  }
});

//endpoint for user login
app.post("/login", async (req, res) => {
  const { user_email, user_password } = req.body;
  console.log({ user_email, user_password });

  try {
    const result = await db.query(
      "SELECT user_id, user_password FROM users WHERE user_email = $1",
      [user_email]
    );

    //if there is a user returned in the variable
    if (result.rows.length > 0) {
      const user = result.rows[0];
      //I need to compare the hashed passwords
      const passwordMatch = await bcrypt.compare(
        user_password,
        user.user_password
      );

      if (passwordMatch) {
        res.json({
          message: "Authentication successful",
          user_id: user.user_id,
        });
      } else {
        res.json({ error: "Incorrect password" });
      }
    } else {
      res.json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.json({ error });
  }
});

//endpoint for adding entries to db
// `:` indicates route/url parameter
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
    console.error("Error adding entry to database:", error);
    res.json({ error });
  }
});

//endpoint to update user information by user_id
app.patch("/edit-users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { user_name, user_email, user_password } = req.body;

    //commenting this out for now, causing issues in db, different password values, even if user does not change password
    const newhashedUserPassword = hashPassword(user_password);

    const result = await db.query(
      "UPDATE users SET user_name=$1, user_email=$2, user_password=$3 WHERE user_id=$4 RETURNING *",
      [user_name, user_email, newhashedUserPassword, user_id]
    );
    res.status(400).json(result.rows[0]);
  } catch (error) {
    console.error("Error editing user:", error);
    res.json({ error });
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
    console.error("Error editing entry:", error);
    res.json({ error });
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
    console.error("Error deleting user:", error);
    res.json({ error });
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
    console.error("Error deleting entry:", error);
    res.json({ error });
  }
});

//port listening
app.listen(PORT, () => {
  console.log(`Estoy escuchando en port ${PORT}`);
});

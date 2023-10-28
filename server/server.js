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

app.get("/", (req, res) => {
  res.json("nuevo comienzo");
});

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

app.get("/entries", async (req, res) => {
  try {
    const { rows: entries } = await db.query("SELECT * FROM entries");
    res.send(entries);
  } catch (error) {
    console.error("Error in Database Query:", error);
    return res.status(500).json({ error });
  }
});

//add post, put/patch and delete endpoints

app.listen(PORT, () => {
  console.log(`Estoy escuchando en port ${PORT}`);
});

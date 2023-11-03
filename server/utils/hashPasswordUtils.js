import bcrypt from "bcrypt";

//my intent is to eventually hash the password of users upon creating an account
//before inserting username and userpassord into "users" table, I will hash the user's password

function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

export { hashPassword };

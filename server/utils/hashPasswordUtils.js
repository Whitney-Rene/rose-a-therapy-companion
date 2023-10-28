import bcrypt from "bcrypt";

//my intent is to eventually hash the password of users before inserting in the db, need to think through wherr to import this function
function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

export { hashPassword };

import bcrypt from "bcrypt";

//function to hash the password of users upon creating an account

function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

export { hashPassword };

import bcrypt from 'bcrypt';

function hashPassword (password) {
    const saltRounds =10;
    return bcrypt.hashSync(password, saltRounds);
}

export { hashPassword };

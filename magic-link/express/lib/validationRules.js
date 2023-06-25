const z = require("zod").z;

const required = (name) => z.string().min(1, `${name} is required`);
const email = (name = "Email") => required(name).email(`${name} is not valid`);
const password = (number = 5, name = "Password") =>
  required(name).min(number, `${name} must be at least ${number} characters`);

module.exports = {
  required,
  email,
  password,
};

const ORIGIN = "*";
const PORT = process.env.PORT || 3001;

const MONGO_URI = process.env.MONGO_URI;
const MONGO_OPTIONS = {};

const JWT_SECRET = process.env.JWT_SECRET;

const ROLES = ['Student', 'Teacher', 'Admin'];


module.exports = {
  ORIGIN,
  PORT,
  MONGO_URI,
  MONGO_OPTIONS,
  JWT_SECRET,
  ROLES
};

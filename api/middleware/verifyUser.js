import jwt from 'jsonwebtoken';
/**
 * This function handles all the request routes
 * @param {object} req any number
 * @returns {object} decoded usersname and type  from the object.
 */
export default (req) => {
  const token = req.headers.authorization.split(' ')[1];

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.userData = decoded;
};

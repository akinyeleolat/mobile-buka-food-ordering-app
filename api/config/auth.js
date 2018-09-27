
const token = jwt.sign({
  username,
  id,
}, process.env.SECRET_KEY,
  {
    expiresIn: '1h',
  });
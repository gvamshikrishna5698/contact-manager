const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status = 403;
    res.send("user must be logged in.");
  }
};

module.exports = {
  authMiddleware,
};

module.exports = (req, res, next) => {
  try {
    const user = req.user;
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: admin only' });
    }
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' });
  }
};

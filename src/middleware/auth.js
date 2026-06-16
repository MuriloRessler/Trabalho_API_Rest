const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // EXIGÊNCIA ESTRITA: o payload DEVE conter o ID do usuário
    if (!decoded.id) {
      return res.status(403).json({ message: 'Acesso negado. ID do usuário ausente no token.' });
    }

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};
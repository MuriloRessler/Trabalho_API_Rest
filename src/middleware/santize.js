const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Erros de validação do Mongoose
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ message: 'Erro de validação', errors: messages });
  }

  // Duplicate key (email único)
  if (err.code === 11000) {
    return res.status(400).json({ message: 'Este email já está cadastrado.' });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'Erro interno do servidor'
  });
};

module.exports = errorHandler;
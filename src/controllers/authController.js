const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se email já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    // Cria o usuário
    const user = new User({ name, email, password });
    await user.save();

    // Gera o token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('ERRO NO REGISTER:', error); // vai mostrar o erro real no terminal
    return res.status(500).json({
      message: 'Erro no servidor.',
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    const senhaCorreta = await user.comparePassword(password);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('ERRO NO LOGIN:', error); // vai mostrar o erro real no terminal
    return res.status(500).json({
      message: 'Erro no servidor.',
      error: error.message
    });
  }
};
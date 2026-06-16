const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { nome, email, password } = req.body;

    if (!nome || !email || !password) {
      return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
    }

    const existe = await usuarioModel.findByEmail(email);
    if (existe) {
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }

    const usuario = await usuarioModel.create({ nome, email, password });

    const token = jwt.sign(
      { id: usuario.id_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      token,
      usuario: { id: usuario.id_usuario, nome: usuario.nome, email: usuario.email }
    });

  } catch (error) {
    console.error('ERRO NO REGISTER:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }

    const usuario = await usuarioModel.findByEmail(email);
    if (!usuario) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }

    const senhaCorreta = await bcrypt.compare(password, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }

    const token = jwt.sign(
      { id: usuario.id_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      usuario: { id: usuario.id_usuario, nome: usuario.nome, email: usuario.email }
    });

  } catch (error) {
    console.error('ERRO NO LOGIN:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};
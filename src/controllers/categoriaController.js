const categoriaModel = require('../models/categoriaModel');

exports.getAll = async (req, res) => {
  try {
    const categorias = await categoriaModel.getAll();
    return res.json(categorias);
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const categoria = await categoriaModel.getById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }
    return res.json(categoria);
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ message: 'O campo "nome" é obrigatório.' });
    }
    const nova = await categoriaModel.create(nome.trim());
    return res.status(201).json(nova);
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ message: 'O campo "nome" é obrigatório.' });
    }
    const atualizado = await categoriaModel.update(req.params.id, nome.trim());
    if (!atualizado) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }
    return res.json({ message: 'Categoria atualizada com sucesso.', id_categoria: req.params.id, nome: nome.trim() });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const removido = await categoriaModel.remove(req.params.id);
    if (!removido) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }
    return res.json({ message: 'Categoria deletada com sucesso.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};
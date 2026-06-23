const produtoModel = require('../models/produtoModel');

exports.getAll = async (req, res) => {
  try {
    const produtos = await produtoModel.getAll();
    return res.json(produtos);
  } catch (error) {
    console.error('ERRO AO LISTAR PRODUTOS:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const produto = await produtoModel.getById(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    return res.json(produto);
  } catch (error) {
    console.error('ERRO AO BUSCAR PRODUTO:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome, valor, estoque, categorias_id_categoria } = req.body;

    if (!nome || valor === undefined || !categorias_id_categoria) {
      return res.status(400).json({
        message: 'Os campos "nome", "valor" e "categorias_id_categoria" são obrigatórios.'
      });
    }

    const categoriaOk = await produtoModel.categoriaExiste(categorias_id_categoria);
    if (!categoriaOk) {
      return res.status(400).json({ message: 'Categoria informada não existe.' });
    }

    const novo = await produtoModel.create({
      nome,
      valor,
      estoque: estoque ?? 1,
      categorias_id_categoria,
    });
    return res.status(201).json(novo);
  } catch (error) {
    console.error('ERRO AO CRIAR PRODUTO:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { nome, valor, estoque, categorias_id_categoria } = req.body;

    if (!nome || valor === undefined || !categorias_id_categoria) {
      return res.status(400).json({
        message: 'Os campos "nome", "valor" e "categorias_id_categoria" são obrigatórios.'
      });
    }

    const categoriaOk = await produtoModel.categoriaExiste(categorias_id_categoria);
    if (!categoriaOk) {
      return res.status(400).json({ message: 'Categoria informada não existe.' });
    }

    const atualizado = await produtoModel.update(req.params.id, {
      nome,
      valor,
      estoque: estoque ?? 1,
      categorias_id_categoria,
    });

    if (!atualizado) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    return res.json({ message: 'Produto atualizado com sucesso.', id_produto: req.params.id });
  } catch (error) {
    console.error('ERRO AO ATUALIZAR PRODUTO:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const removido = await produtoModel.remove(req.params.id);
    if (!removido) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    return res.json({ message: 'Produto deletado com sucesso.' });
  } catch (error) {
    console.error('ERRO AO DELETAR PRODUTO:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};
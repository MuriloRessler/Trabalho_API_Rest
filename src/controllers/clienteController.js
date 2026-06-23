const clienteModel = require('../models/clienteModel');

exports.getAll = async (req, res) => {
  try {
    const clientes = await clienteModel.getAll();
    return res.json(clientes);
  } catch (error) {
    console.error('ERRO AO LISTAR CLIENTES:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const cliente = await clienteModel.getById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    return res.json(cliente);
  } catch (error) {
    console.error('ERRO AO BUSCAR CLIENTE:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome, telefone, status } = req.body;

    if (!nome || !telefone) {
      return res.status(400).json({ message: 'Os campos "nome" e "telefone" são obrigatórios.' });
    }

    if (status && !clienteModel.STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({
        message: `Status inválido. Use um destes: ${clienteModel.STATUS_VALIDOS.join(', ')}.`
      });
    }

    const novo = await clienteModel.create({ nome, telefone, status });
    return res.status(201).json(novo);
  } catch (error) {
    console.error('ERRO AO CRIAR CLIENTE:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { nome, telefone, status } = req.body;

    if (!nome || !telefone) {
      return res.status(400).json({ message: 'Os campos "nome" e "telefone" são obrigatórios.' });
    }

    if (status && !clienteModel.STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({
        message: `Status inválido. Use um destes: ${clienteModel.STATUS_VALIDOS.join(', ')}.`
      });
    }

    const atualizado = await clienteModel.update(req.params.id, { nome, telefone, status });
    if (!atualizado) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    return res.json({ message: 'Cliente atualizado com sucesso.', id_cliente: req.params.id });
  } catch (error) {
    console.error('ERRO AO ATUALIZAR CLIENTE:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const removido = await clienteModel.remove(req.params.id);
    if (!removido) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    return res.json({ message: 'Cliente deletado com sucesso.' });
  } catch (error) {
    console.error('ERRO AO DELETAR CLIENTE:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};
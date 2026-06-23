const pedidoModel = require('../models/pedidoModel');

exports.getAll = async (req, res) => {
  try {
    const pedidos = await pedidoModel.getAll();
    return res.json(pedidos);
  } catch (error) {
    console.error('ERRO AO LISTAR PEDIDOS:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const pedido = await pedidoModel.getById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado.' });
    }
    return res.json(pedido);
  } catch (error) {
    console.error('ERRO AO BUSCAR PEDIDO:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

// Body esperado:
// {
//   "data": "2026-06-22",
//   "clientes_id_cliente": 1,
//   "itens": [
//     { "produtos_id_produto": 3, "quantidade": 2, "valor": 49.90 }
//   ]
// }
exports.create = async (req, res) => {
  try {
    const { data, clientes_id_cliente, itens } = req.body;

    if (!data || !clientes_id_cliente) {
      return res.status(400).json({
        message: 'Os campos "data" e "clientes_id_cliente" são obrigatórios.'
      });
    }

    const clienteOk = await pedidoModel.clienteExiste(clientes_id_cliente);
    if (!clienteOk) {
      return res.status(400).json({ message: 'Cliente informado não existe.' });
    }

    if (itens && Array.isArray(itens)) {
      for (const item of itens) {
        if (!item.produtos_id_produto || item.quantidade === undefined || item.valor === undefined) {
          return res.status(400).json({
            message: 'Cada item precisa de "produtos_id_produto", "quantidade" e "valor".'
          });
        }
        const produtoOk = await pedidoModel.produtoExiste(item.produtos_id_produto);
        if (!produtoOk) {
          return res.status(400).json({ message: `Produto id ${item.produtos_id_produto} não existe.` });
        }
      }
    }

    const novo = await pedidoModel.create({ data, clientes_id_cliente, itens });
    return res.status(201).json(novo);
  } catch (error) {
    console.error('ERRO AO CRIAR PEDIDO:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { data, clientes_id_cliente } = req.body;

    if (!data || !clientes_id_cliente) {
      return res.status(400).json({
        message: 'Os campos "data" e "clientes_id_cliente" são obrigatórios.'
      });
    }

    const clienteOk = await pedidoModel.clienteExiste(clientes_id_cliente);
    if (!clienteOk) {
      return res.status(400).json({ message: 'Cliente informado não existe.' });
    }

    const atualizado = await pedidoModel.update(req.params.id, { data, clientes_id_cliente });
    if (!atualizado) {
      return res.status(404).json({ message: 'Pedido não encontrado.' });
    }
    return res.json({ message: 'Pedido atualizado com sucesso.', id_pedido: req.params.id });
  } catch (error) {
    console.error('ERRO AO ATUALIZAR PEDIDO:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const removido = await pedidoModel.remove(req.params.id);
    if (!removido) {
      return res.status(404).json({ message: 'Pedido não encontrado.' });
    }
    return res.json({ message: 'Pedido deletado com sucesso.' });
  } catch (error) {
    console.error('ERRO AO DELETAR PEDIDO:', error);
    return res.status(500).json({ message: 'Erro no servidor.', error: error.message });
  }
};
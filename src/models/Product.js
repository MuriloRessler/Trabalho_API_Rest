//modelo de produto para o catálogo, com campos dinâmicos para atributos personalizados
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome do produto é obrigatório'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória']
  },
  price: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
    min: [0, 'Preço não pode ser negativo']
  },
  category: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    enum: ['eletronicos', 'roupas', 'alimentos', 'outros']
  },
  stock: {
    type: Number,
    default: 0
  },
  attributes: {
    type: Map,       // Campo dinâmico — flexibilidade do NoSQL!
    of: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
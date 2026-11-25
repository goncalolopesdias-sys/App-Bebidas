const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  itens: [{
    nome: String,
    preco: Number,
    quantidade: Number,
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pendente', enum: ['pendente', 'a caminho', 'entregue'] },
}, { timestamps: true });

module.exports = mongoose.model('Pedido', pedidoSchema);
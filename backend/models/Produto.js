const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  categoria: { type: String, required: true, enum: ['cerveja', 'vodka', 'whisky'] },
  imgKey: { type: String, required: true },
  sub: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Produto', produtoSchema);
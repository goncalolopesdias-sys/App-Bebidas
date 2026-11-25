const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// Listar todos os produtos (ou filtrar por categoria)
router.get('/', async (req, res) => {
  try {
    const { categoria } = req.query;
    const filtro = categoria ? { categoria } : {};
    const produtos = await Produto.find(filtro);
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Obter um produto específico por ID
router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Criar produto
router.post('/', async (req, res) => {
  try {
    const produto = new Produto(req.body);
    await produto.save();
    res.status(201).json(produto);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Atualizar produto
router.put('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Apagar produto
router.delete('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json({ mensagem: 'Produto apagado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
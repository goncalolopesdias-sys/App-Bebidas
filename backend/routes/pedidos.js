const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const auth = require('../middleware/auth');

// Criar pedido
router.post('/', auth, async (req, res) => {
  try {
    const { itens, total } = req.body;
    const pedido = new Pedido({ usuario: req.usuarioId, itens, total });
    await pedido.save();
    res.status(201).json(pedido);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Listar pedidos do utilizador
router.get('/', auth, async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.usuarioId }).sort({ createdAt: -1 });
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Obter um pedido específico
router.get('/:id', auth, async (req, res) => {
  try {
    const pedido = await Pedido.findOne({ _id: req.params.id, usuario: req.usuarioId });
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Atualizar status do pedido (ex: pendente -> a caminho -> entregue)
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const pedido = await Pedido.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuarioId },
      { status },
      { new: true, runValidators: true }
    );
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Cancelar / apagar pedido
router.delete('/:id', auth, async (req, res) => {
  try {
    const pedido = await Pedido.findOneAndDelete({ _id: req.params.id, usuario: req.usuarioId });
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });
    res.json({ mensagem: 'Pedido cancelado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
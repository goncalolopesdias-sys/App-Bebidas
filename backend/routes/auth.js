const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

router.post('/register', async (req, res) => {
  console.log('📥 Pedido de registo recebido:', req.body);
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Preenche todos os campos' });
    }

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ erro: 'Email já registado' });
    }

    const usuario = new Usuario({ nome, email, senha });
    await usuario.save();

    const token = jwt.sign({ id: usuario._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      token,
      usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email },
    });
  } catch (err) {
    console.error('❌ Erro no registo:', err);
    return res.status(500).json({ erro: err.message });
  }
});

router.post('/login', async (req, res) => {
  console.log('📥 Pedido de login recebido:', req.body);
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Preenche todos os campos' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ erro: 'Email ou password inválidos' });
    }

    const senhaCorreta = await usuario.compararSenha(senha);
    if (!senhaCorreta) {
      return res.status(400).json({ erro: 'Email ou password inválidos' });
    }

    const token = jwt.sign({ id: usuario._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      token,
      usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email },
    });
  } catch (err) {
    console.error('❌ Erro no login:', err);
    return res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
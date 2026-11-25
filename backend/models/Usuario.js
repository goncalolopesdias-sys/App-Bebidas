const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
}, { timestamps: true });

usuarioSchema.pre('save', async function () {
  if (!this.isModified('senha')) return;
  this.senha = await bcrypt.hash(this.senha, 10);
});

usuarioSchema.methods.compararSenha = async function (senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
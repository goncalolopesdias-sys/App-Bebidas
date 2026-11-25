require('dotenv').config();
const mongoose = require('mongoose');
const Produto = require('./models/Produto');

const produtos = [
  { nome: 'Cerveja Sagres', preco: 1.00, categoria: 'cerveja', imgKey: 'sagres', sub: 'Lager - 33cl' },
  { nome: 'Cerveja Super Bock', preco: 1.50, categoria: 'cerveja', imgKey: 'superbock', sub: 'Lager - 33cl' },
  { nome: 'Cerveja Heineken', preco: 2.25, categoria: 'cerveja', imgKey: 'heineken', sub: 'Lager - 33cl' },
  { nome: 'Cerveja Argus', preco: 1.00, categoria: 'cerveja', imgKey: 'argus', sub: 'Lager - 33cl' },
  { nome: 'Absolut Vodka', preco: 21.49, categoria: 'vodka', imgKey: 'absolut', sub: 'Vodka - 70cl' },
  { nome: 'Smirnoff Red Vodka', preco: 21.69, categoria: 'vodka', imgKey: 'smirnoff', sub: 'Vodka - 70cl' },
  { nome: 'Grey Goose Vodka', preco: 55.00, categoria: 'vodka', imgKey: 'greygoose', sub: 'Vodka - 70cl' },
  { nome: 'Ultimat Vodka', preco: 31.60, categoria: 'vodka', imgKey: 'ultimat', sub: 'Vodka - 70cl' },
  { nome: "Jack Daniel's", preco: 25.99, categoria: 'whisky', imgKey: 'jackdaniels', sub: 'Whisky - 70cl' },
  { nome: 'Johnnie Walker', preco: 22.50, categoria: 'whisky', imgKey: 'johnniewalker', sub: 'Whisky - 70cl' },
  { nome: 'Jameson', preco: 19.99, categoria: 'whisky', imgKey: 'jameson', sub: 'Whisky - 70cl' },
  { nome: 'Glenfiddich', preco: 45.00, categoria: 'whisky', imgKey: 'glenfiddich', sub: 'Whisky - 70cl' },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB conectado!');
    await Produto.deleteMany({});
    await Produto.insertMany(produtos);
    console.log('🍺 Produtos adicionados com sucesso!');
    process.exit();
  })
  .catch((err) => console.error('❌ Erro:', err));
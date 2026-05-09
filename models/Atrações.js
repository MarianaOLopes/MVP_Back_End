const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    categoria: String,
    descricao: String,
    imagem: String, // Para colar o link da foto
    abertura: String,
    fechamento: String,
    dias: [String], // Vai salvar Seg, Ter, etc.
    dataCriacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Atracoes', ItemSchema);
const mongoose = require('mongoose');

const ComentarioSchema = new mongoose.Schema({
    atracaoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Atracao', required: true },
    usuarioNome: { type: String, required: true },
    texto: { type: String, required: true },
    nota: { type: Number, min: 1, max: 5, required: true },
    data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comentario', ComentarioSchema);
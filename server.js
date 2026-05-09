const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importação dos modelos (Certifique-se que os arquivos existem em ./models/)
const Usuario = require('./models/usuario');
const Atracao = require('./models/Atrações'); 
const Comentario = require('./models/comentario');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 
app.use(express.static('public'));

// 1. Conexão com o Banco Local
mongoose.connect('mongodb://localhost:27017/mageVerdeDB')
    .then(() => console.log("✅ Conectado ao Banco de Magé!"))
    .catch(err => console.error("❌ Erro ao conectar:", err));

// --- ROTAS DE ATRAÇÕES ---

// Criar Atração
app.post('/api/atracoes', async (req, res) => {
    try {
        const novaAtracao = new Atracao(req.body);
        await novaAtracao.save();
        res.status(201).json({ mensagem: "Atração salva com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao salvar no banco" });
    }
});

// Listar Atrações
app.get('/api/atracoes', async (req, res) => {
    try {
        const lista = await Atracao.find();
        res.json(lista);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar atrações" });
    }
});

// Excluir Atração
app.delete('/api/atracoes/:id', async (req, res) => {
    try {
        await Atracao.findByIdAndDelete(req.params.id);
        res.json({ mensagem: "Atração removida com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao excluir do banco" });
    }
});

// Atualizar Atração
app.put('/api/atracoes/:id', async (req, res) => {
    try {
        const resultado = await Atracao.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!resultado) return res.status(404).json({ erro: "Atração não encontrada" });
        res.json({ mensagem: "Atração atualizada com sucesso!", atracao: resultado });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar" });
    }
});

// --- ROTAS DE USUÁRIO (Login e Cadastro) ---

// Cadastro de Usuário (Unificado)
app.post('/api/usuarios', async (req, res) => {
    const { nome, email, senha, tipo } = req.body; // 'tipo' pode ser 'admin' ou 'visitante'

    // Validação Alfanumérica
    const regexAlfanumerica = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    if (!regexAlfanumerica.test(senha)) {
        return res.status(400).json({ erro: "A senha precisa conter letras e números." });
    }

    try {
        const usuarioJaExiste = await Usuario.findOne({ email });
        if (usuarioJaExiste) return res.status(400).json({ erro: "E-mail já cadastrado." });

        const novoUsuario = new Usuario({ nome, email, senha, tipo });
        await novoUsuario.save();
        res.status(201).json({ mensagem: "Conta criada com sucesso!", usuario: nome });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao salvar usuário." });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({ erro: "E-mail ou senha incorretos!" });
        }
        // Retornamos o nome e o tipo para o front-end saber se é admin ou não
        res.json({ 
            mensagem: "Login realizado!", 
            usuario: usuario.nome, 
            tipo: usuario.tipo 
        });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
});

app.put('/api/usuarios/redefinir-senha', async (req, res) => {
    const { email, novaSenha } = req.body;

    try {
        // Busca o usuário e atualiza a senha
        const usuario = await Usuario.findOneAndUpdate(
            { email: email }, 
            { senha: novaSenha }, 
            { new: true }
        );

        if (!usuario) {
            return res.status(404).json({ erro: "E-mail não encontrado!" });
        }

        res.json({ mensagem: "Senha atualizada com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao redefinir senha." });
    }
});

// Rota para salvar um novo comentário
app.post('/api/comentarios', async (req, res) => {
    try {
        const novoComentario = new Comentario(req.body);
        await novoComentario.save();
        res.status(201).json({ mensagem: "Comentário salvo!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao salvar no banco" });
    }
});

// Rota para buscar comentários de uma atração específica
app.get('/api/comentarios/:atracaoId', async (req, res) => {
    try {
        const comentarios = await Comentario.find({ atracaoId: req.params.atracaoId });
        res.json(comentarios);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar avaliações." });
    }
});

// Iniciar o Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
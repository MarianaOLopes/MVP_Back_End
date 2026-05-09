// 1. Variável Global (MUITO IMPORTANTE: sem isso o editar dá erro)
let idEmEdicao = null;

// 2. Função de Segurança
function verificarAcesso() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (!usuarioLogado || tipoUsuario !== 'admin') {
        alert("Acesso negado!");
        window.location.replace('login.html');
        return false;
    }
    return true;
}

// 3. Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    if (verificarAcesso()) {
        configurarFormulario();
        carregarTabela();
    }
});

// Proteção contra o botão "Voltar" do navegador
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        verificarAcesso();
    }
});

// 4. Lógica do Formulário (Salvar e Editar)
function configurarFormulario() {
    const formAdmin = document.getElementById('formAdmin');
    if (!formAdmin) return;

    formAdmin.addEventListener('submit', async (event) => {
        event.preventDefault();

        // CAPTURA DOS DIAS (Garante que pegue Segunda, Quarta, etc.)
        const checkboxes = document.querySelectorAll('input[name="dias"]:checked');
        const diasSelecionados = Array.from(checkboxes).map(cb => cb.value);

        const dados = {
            titulo: document.getElementById('title').value,
            categoria: document.getElementById('category').value,
            descricao: document.getElementById('description').value,
            abertura: document.getElementById('openTime').value,
            fechamento: document.getElementById('closeTime').value,
            dias: diasSelecionados 
        };

        const metodo = idEmEdicao ? 'PUT' : 'POST';
        const url = idEmEdicao 
            ? `http://localhost:3000/api/atracoes/${idEmEdicao}` 
            : 'http://localhost:3000/api/atracoes';

        try {
            const resposta = await fetch(url, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                alert(idEmEdicao ? "Atualizado com sucesso!" : "Cadastrado com sucesso!");
                idEmEdicao = null; // Reseta o modo edição
                formAdmin.reset();
                document.querySelector('.save-btn').textContent = "Salvar";
                carregarTabela(); // Atualiza a lista na hora
            }
        } catch (error) {
            console.error("Erro na operação:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });
}

// 5. Carregar a Tabela de Gestão
async function carregarTabela() {
    const corpoTabela = document.getElementById('corpoTabela'); // Ajustado para o ID do seu HTML
    if (!corpoTabela) return;
    
    try {
        const resposta = await fetch('http://localhost:3000/api/atracoes');
        const listaAtracoes = await resposta.json();

        corpoTabela.innerHTML = ''; 

        listaAtracoes.forEach(item => {
            corpoTabela.innerHTML += `
                <tr>
                    <td class="td">${item.titulo}</td>
                    <td class="td">${item.dias && item.dias.length > 0 ? item.dias.join(', ') : 'Não definido'}</td>
                    <td class="td">${item.abertura} - ${item.fechamento}</td>
                    <td class="td actions">
                        <button class="edit-btn" onclick="prepararEdicao('${item._id}')">Editar</button>
                        <button class="delete-btn" onclick="excluirAtracao('${item._id}')">Excluir</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar lista:", error);
    }
}

// 6. Excluir Atração
async function excluirAtracao(id) {
    if (confirm("Deseja mesmo excluir esta atração de Magé?")) {
        try {
            const resposta = await fetch(`http://localhost:3000/api/atracoes/${id}`, {
                method: 'DELETE'
            });

            if (resposta.ok) {
                alert("Removido com sucesso!");
                carregarTabela();
            }
        } catch (error) {
            console.error("Erro ao excluir:", error);
        }
    }
}

// 7. Preparar para Editar
async function prepararEdicao(id) {
    try {
        const resposta = await fetch(`http://localhost:3000/api/atracoes`);
        const lista = await resposta.json();
        const atracao = lista.find(item => item._id === id);

        if (atracao) {
            document.getElementById('title').value = atracao.titulo;
            document.getElementById('category').value = atracao.categoria;
            document.getElementById('description').value = atracao.descricao;
            document.getElementById('openTime').value = atracao.abertura;
            document.getElementById('closeTime').value = atracao.fechamento;
            
            idEmEdicao = id; 
            document.querySelector('.save-btn').textContent = "Atualizar Atração";
            
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Erro ao preparar edição:", error);
    }
}
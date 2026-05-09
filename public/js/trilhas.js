// 1. Função para verificar se a trilha abre no dia atual
function verificarStatusHoje(diasDisponiveis) {
    const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const hojeIndex = new Date().getDay(); 
    const hojeNome = diasSemana[hojeIndex];

    // Verifica se a lista de dias existe e contém o dia de hoje
    if (diasDisponiveis && diasDisponiveis.includes(hojeNome)) {
        return `<span style="color: green; font-weight: bold;"> ● Aberto hoje</span>`;
    } else {
        return `<span style="color: red; font-weight: bold;"> ○ Fechado hoje</span>`;
    }
}

// 2. Função principal para carregar as atrações de Magé
async function carregarTrilhas() {
    const container = document.getElementById('lista-atracoes');
    if (!container) return;
    
    try {
        const resposta = await fetch('http://localhost:3000/api/atracoes');
        if (!resposta.ok) throw new Error('Falha na resposta do servidor');

        const trilhas = await resposta.json();

        if (trilhas.length === 0) {
            container.innerHTML = "<p>Aguardando novas trilhas serem cadastradas por Magé.</p>";
            return;
        }

        // Gerando o HTML dinâmico
        container.innerHTML = trilhas.map(trilha => `
            <div class="card" style="border: 1px solid #ccc; padding: 20px; margin-bottom: 20px; border-radius: 8px; background: white; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
                <h3>${trilha.titulo} ${verificarStatusHoje(trilha.dias)}</h3>
                <p><strong>Categoria:</strong> ${trilha.categoria}</p>
                <p>${trilha.descricao}</p>
                
                <div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin: 10px 0;">
                    <p><strong>⏰ Horário:</strong> ${trilha.abertura} às ${trilha.fechamento}</p>
                    <p><strong>🗓️ Dias:</strong> ${trilha.dias && trilha.dias.length > 0 ? trilha.dias.join(', ') : 'Consulte o local'}</p>
                </div>
                
                <hr>
                <h4>Avaliações</h4>
                <div id="lista-comentarios-${trilha._id}" style="max-height: 200px; overflow-y: auto; margin-bottom: 10px;"></div>
                
                <div class="form-comentario">
                    <textarea id="txt-${trilha._id}" placeholder="Como foi sua experiência?" style="width: 100%; height: 60px; margin-bottom: 5px; border-radius: 4px; padding: 5px;"></textarea>
                    <button onclick="enviarComentario('${trilha._id}')" style="cursor: pointer; background: #2e7d32; color: white; border: none; padding: 8px 15px; border-radius: 4px;">Avaliar</button>
                </div>
            </div>
        `).join('');

        // Carrega os comentários de cada atração após criar os cards
        trilhas.forEach(t => carregarComentarios(t._id));

    } catch (err) {
        console.error("Erro detalhado:", err);
        container.innerHTML = `<p>Erro ao carregar atrações. O servidor está descansando!</p>`;
    }
}

// 3. Função para enviar avaliação
async function enviarComentario(idAtracao) {
    const campoTexto = document.getElementById(`txt-${idAtracao}`);
    const textoValue = campoTexto.value;

    if (!textoValue.trim()) {
        alert("Por favor, escreva sua experiência antes de enviar.");
        return;
    }

    const usuarioNome = localStorage.getItem('usuarioLogado') || 'Visitante Anônimo';

    try {
        const resposta = await fetch('http://localhost:3000/api/comentarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                atracaoId: idAtracao,
                usuarioNome: usuarioNome,
                texto: textoValue,
                nota: 5 
            })
        });

        if (resposta.ok) {
            alert("Avaliação enviada! Obrigado por contribuir com o ecoturismo de Magé.");
            campoTexto.value = ""; 
            carregarComentarios(idAtracao); 
        } else {
            alert("Erro ao enviar avaliação.");
        }
    } catch (error) {
        alert("Não foi possível conectar ao servidor.");
    }
}

// 4. Função para carregar comentários
async function carregarComentarios(idAtracao) {
    const listaDiv = document.getElementById(`lista-comentarios-${idAtracao}`);
    try {
        const resposta = await fetch(`http://localhost:3000/api/comentarios/${idAtracao}`);
        const comentarios = await resposta.json();

        if (comentarios.length === 0) {
            listaDiv.innerHTML = '<p style="color: gray; font-size: 0.8rem;">Nenhuma avaliação ainda.</p>';
            return;
        }

        listaDiv.innerHTML = comentarios.map(c => `
            <div style="border-bottom: 1px solid #eee; margin-top: 8px; padding-bottom: 5px;">
                <strong style="font-size: 0.9rem;">${c.usuarioNome}:</strong> 
                <span style="font-size: 0.9rem;">${c.texto}</span>
            </div>
        `).join('');
    } catch (err) {
        console.log("Erro ao buscar comentários.");
    }
}

// Inicializa a página ao carregar
window.onload = carregarTrilhas;
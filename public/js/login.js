document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.loginForm');
    const formCadastro = document.getElementById('formCadastro');

    // --- LÓGICA DE LOGIN ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const emailValue = document.getElementById('email').value;
            const passwordValue = document.getElementById('password').value;

            try {
                const resposta = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: emailValue, senha: passwordValue })
                });

                const resultado = await resposta.json();

                if (resposta.ok) {
                    alert(`Sucesso! Bem-vindo, ${resultado.usuario}!`);
                    
                    // GUARDAR OS DADOS (para saber quem está logado depois)
                    localStorage.setItem('usuarioLogado', resultado.usuario);
                    localStorage.setItem('tipoUsuario', resultado.tipo);

                    // REDIRECIONAMENTO INTELIGENTE
                    if (resultado.tipo === 'admin') {
                        window.location.href = 'admin.html';
                    } else {
                        window.location.href = 'index.html'; // Visitante vai para a home
                    }
                } else {
                    alert(resultado.erro || "Erro ao tentar entrar.");
                }
            } catch (error) {
                alert("O servidor está desligado!");
            }
        });
    }

    // --- LÓGICA DE CADASTRO ---
    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('password').value;
            
            // DICA: Você pode pegar o tipo de um <select> no HTML se quiser
            // const tipo = document.getElementById('tipoUsuario').value; 

            try {
                const response = await fetch('http://localhost:3000/api/usuarios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, senha, tipo: 'visitante' }) // Padrão visitante
                });

                const resultado = await response.json();

                if (response.ok) {
                    alert("Cadastro realizado! Faça login para continuar.");
                    window.location.href = 'login.html'; // Melhor mandar logar para garantir
                } else {
                    alert(resultado.erro);
                }
            } catch (err) {
                alert("Erro ao conectar com o servidor.");
            }
        });
    }
});
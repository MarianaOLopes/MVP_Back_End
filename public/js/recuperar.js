window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formRecuperar');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const novaSenha = document.getElementById('password').value;
            const confirmaSenha = document.getElementById('confirmPassword').value;

            // Validação de segurança: as senhas coincidem?
            if (novaSenha !== confirmaSenha) {
                alert("❌ As senhas não coincidem!");
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/usuarios/redefinir-senha', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, novaSenha })
                });

                const resultado = await response.json();

                if (response.ok) {
                    alert("✅ Senha alterada com sucesso!");
                    window.location.href = 'login.html';
                } else {
                    alert("❌ Erro: " + (resultado.erro || "Verifique o e-mail informado."));
                }
            } catch (err) {
                alert("🚨 Erro de conexão com o servidor.");
            }
        });
    }
});
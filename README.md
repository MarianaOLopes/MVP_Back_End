# 🌿 Magé Verde Online

## 👥 Integrantes da Equipe
* **Douglas Bernard Martins Teixeira da Silva**
* **Mariana Oliveira Lopes** 

---

## 🚩 Situação-Problema Escolhida
A região de Magé possui grande potencial para o ecoturismo, reunindo trilhas, cachoeiras e diversas atrações naturais. Apesar dessa riqueza ambiental, a ausência de uma plataforma centralizada com informações confiáveis sobre horários de funcionamento, regras de acesso e dias disponíveis para visitação dificulta o planejamento turístico e compromete a experiência dos visitantes.

Diante desse cenário, o projeto **Magé Verde Online** foi desenvolvido com o objetivo de utilizar a tecnologia para organizar, centralizar e facilitar o acesso a informações turísticas essenciais, promovendo uma experiência mais prática, segura e eficiente.

---

## 💻 Descrição Sucinta do MVP
O Magé Verde Online é uma aplicação web voltada para a gestão e disponibilização de informações sobre atrações turísticas naturais de Magé.

### Principais funcionalidades do MVP:
* 🔐 **Controle de Acesso:** Sistema de autenticação com diferenciação entre administradores e visitantes, garantindo segurança no gerenciamento das informações.
* 🛠️ **Interface Administrativa:** Painel administrativo com funcionalidades completas de CRUD (*Create, Read, Update, Delete*), permitindo ao gestor cadastrar, visualizar, editar e excluir atrações naturais.
* 🗄️ **Persistência de Dados na Nuvem:** Integração com o MongoDB Atlas para armazenamento estruturado de dados como descrições, horários de funcionamento, dias de visitação e regras específicas (Atendendo aos requisitos RNF04 e RNF05).
* 🔄 **Consumo de API:** Arquitetura dinâmica com comunicação síncrona entre Front-End e Back-End por meio de rotas API, possibilitando atualização e gerenciamento eficiente das informações.

---

## 🛠️ Instruções para Executar o MVP Localmente

### Pré-requisitos
* Node.js instalado no computador.
* Conexão com a internet (para acesso ao banco de dados em nuvem).

### Passo a passo
1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/MarianaOLopes/MVP_Back_End](https://github.com/MarianaOLopes/MVP_Back_End)

2. **Acesse a pasta do projeto:**
   cd MVP_Back_End

3. **Instale as dependências:**
    npm install

4. **Configure o banco de dados:**  
    O projeto já está configurado para conectar-se ao banco de dados de produção na nuvem (MongoDB Atlas) através da string inserida no arquivo server.js.

5. **Inicie o servidor:**    
    npm start

6. **Acesse o sistema:**
    Abra o seu navegador e acesse: http://localhost:3000

    🔑 Credenciais para Teste (Acesso ao Sistema)
    Para validar as diferentes permissões do MVP, utilize os usuários abaixo:

    Perfil Administrador (Acesso Completo ao CRUD):

    Login: admin@mageverde.com.br

    Senha: Ad23456789

    Perfil Visitante (Apenas Visualização):

    Login: testevisitante@gmail.com

    Senha: teste1234567

    ℹ️ Informações Adicionais Relevantes
    ✅ Testes de API
    Todas as rotas principais (GET, POST, PUT e DELETE) foram exaustivamente testadas e validadas utilizando o Postman, garantindo o funcionamento adequado, integridade de dados e tratamento de erros com os retornos HTTP apropriados (200, 201, 500).
    ```text
    📁 Organização de Diretórios do Projeto
    MVP_BACK_END/
    ├── models/              # Modelos e estruturas de dados (MongoDB)
    │   ├── Atrações.js      # Modelagem das atrações turísticas
    │   ├── comentario.js    # Modelagem de comentários dos usuários
    │   └── usuario.js       # Modelagem de usuários e autenticação
    ├── public/              # Arquivos públicos e estáticos (HTML, CSS, JS)
    ├── requisitos/          # Documentação de requisitos do projeto
    ├── Testes/              # Testes e validações da aplicação (Postman)
    ├── .gitignore           # Arquivos ignorados pelo Git (node_modules, .env)
    ├── package.json         # Configurações e dependências do projeto
    ├── README.md            # Documentação principal do repositório
    └── server.js            # Arquivo principal do servidor/back-end
    ```text

    🎯 Estrutura e Finalidade
    models/: Centraliza as entidades principais do sistema, garantindo organização da lógica de dados.

    public/: Armazena recursos públicos como HTML, CSS, JavaScript e imagens da interface.

    Testes/: Área destinada à validação funcional do sistema e testes de API (Postman).

    requisitos/: Reúne a documentação acadêmica e requisitos levantados para o MVP.

    server.js: Núcleo da aplicação, responsável por inicializar o servidor, rotas e a integração com o MongoDB Atlas.

    📌 Observação de Evolução Futura
    Para maior padronização profissional de mercado, o projeto possui escalabilidade para evoluir rumo a uma estrutura mais modularizada utilizando o padrão MVC:
    ```text
    src/
    ├── models/
    ├── routes/
    ├── controllers/
    └── config/
    ```text

    🎯 Objetivo Principal
    Demonstrar, por meio de um MVP funcional, como a tecnologia pode contribuir para a valorização do turismo ecológico local, facilitando o acesso à informação e promovendo organização na gestão turística do município de Magé.


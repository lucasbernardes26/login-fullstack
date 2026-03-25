# Sistema de Login Fullstack 🔐

Um sistema completo de autenticação de usuários (Registro e Login) com área administrativa protegida, desenvolvido como projeto prático de operações CRUD e segurança web.

O backend foi estruturado seguindo a **Arquitetura MSEP** (Model/Repository, Service, Entity, Presentation/Controller), garantindo uma separação clara de responsabilidades.

## ✨ Funcionalidades

* **Cadastro de Usuários:** Senhas são criptografadas antes de serem salvas no banco de dados.
* **Autenticação Segura:** Login validado com geração de token JWT (JSON Web Token).
* **Rotas Protegidas:** Área administrativa acessível apenas com um token JWT válido.
* **Interface Dinâmica:** Navegação fluida no frontend (Single Page Application).
* **Logout:** Encerramento de sessão seguro com limpeza de credenciais locais.

## 🚀 Tecnologias Utilizadas

**Frontend:**
* [React](https://reactjs.org/) (com Vite)
* [React Router DOM](https://reactrouter.com/) (Navegação)
* [Axios](https://axios-http.com/) (Requisições HTTP)
* CSS puro para estilização de componentes (Cards e Forms)

**Backend:**
* [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/)
* [MySQL2](https://www.npmjs.com/package/mysql2) (Conexão com banco de dados)
* [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) (Criptografia de senhas)
* [JSON Web Token (JWT)](https://jwt.io/) (Autenticação)
* [CORS](https://www.npmjs.com/package/cors) & [Dotenv](https://www.npmjs.com/package/dotenv)

## 📁 Estrutura do Backend (MSEP)

O projeto foi dividido nas seguintes camadas lógicas:
- **Presentation (Controller):** Lida com as requisições HTTP e respostas (`/register`, `/login`, `/admin-data`).
- **Service:** Contém todas as regras de negócio, validações e geração de tokens.
- **Entity:** Representação da estrutura de dados do Desenvolvedor.
- **Model (Repository):** Responsável exclusivo por executar as queries diretamente no MySQL.

#

Desenvolvido por Lucas Bernardes 💻
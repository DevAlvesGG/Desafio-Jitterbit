# Desafio Jitterbit

API RESTful desenvolvida com Node.js e PostgreSQL.

---

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

---

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/desafio-jitterbit.git
cd desafio-jitterbit
npm install
```

---

## Configuração do banco de dados

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
```

---

## Como executar

```bash
npm run dev
```

O servidor estará disponível em:

```
http://localhost:3006
```

---

## Documentação Swagger

Com o servidor rodando, acesse a documentação completa da API pelo navegador:

```
http://localhost:3006/api-docs
```

Pelo Swagger você consegue visualizar todas as rotas disponíveis e testá-las diretamente pela interface.

---

## Estrutura do projeto

```
src/
├── controller/   # Recebe as requisições e retorna as respostas
├── model/        # Comunicação com o banco de dados
├── routes/       # Definição das rotas da API
└── server.js     # Ponto de entrada da aplicação
```
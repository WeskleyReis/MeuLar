# 🏡 MeuLar

Sistema de gerenciamento financeiro desenvolvido com **ASP.NET Core 8**, **Entity Framework Core**, **SQLite**, **React**, **TypeScript** e **TailwindCSS**.

O objetivo da aplicação é permitir o cadastro de pessoas, registrar receitas e despesas e apresentar um resumo financeiro por pessoa e da aplicação como um todo.

---

# 📸 Funcionalidades

- Cadastro de pessoas
- Cadastro de transações (Receitas e Despesas)
- Validação de regras de negócio
- Exclusão de pessoas
- Relatório financeiro consolidado
- Dashboard com indicadores
- Tratamento centralizado de exceções
- API REST documentada com Swagger

---

# 🏛 Arquitetura

A aplicação foi desenvolvida utilizando uma arquitetura baseada em **Feature Folders**.

Ao invés de separar por Controllers, Services e DTOs na raiz do projeto, cada funcionalidade possui sua própria estrutura.

```
Features
│
├── Pessoas
│   ├── Controllers
│   ├── DTOs
│   ├── Services
│
├── Transacoes
│   ├── Controllers
│   ├── DTOs
│   ├── Services
│
├── Relatorios
│   ├── Controllers
│   ├── DTOs
│   ├── Services
```

Essa abordagem facilita a manutenção e escalabilidade da aplicação, pois toda regra relacionada a uma funcionalidade permanece concentrada em um único lugar.

---

# 📁 Estrutura do Backend

```
MeuLar.API
│
├── Data
│   └── MeuLarDbContext.cs
│
├── Entities
│   ├── Pessoa.cs
│   ├── Transacao.cs
│   └── TipoTransacao.cs
│
├── Features
│
│   ├── Pessoas
│   │
│   │   ├── Controllers
│   │   ├── DTOs
│   │   └── Services
│   │
│   ├── Transacoes
│   │
│   │   ├── Controllers
│   │   ├── DTOs
│   │   └── Services
│   │
│   └── Relatorios
│       ├── Controllers
│       ├── DTOs
│       └── Services
│
├── Middleware
│   └── ExceptionMiddleware.cs
│
├── Migrations
│
└── Program.cs
```

---

# 🎯 Arquitetura da API

Cada funcionalidade segue o fluxo:

```
Controller
      │
      ▼
Service
      │
      ▼
Entity Framework
      │
      ▼
SQLite
```

## Controller

Responsável apenas por receber a requisição HTTP.

Não contém regra de negócio.

Exemplo:

```
POST /api/pessoas
```

↓

Recebe o DTO

↓

Chama o Service

↓

Retorna a resposta.

---

## Service

Toda a regra de negócio da aplicação foi implementada na camada de Service.

Exemplos:

- validar idade da pessoa
- impedir menores cadastrarem receitas
- buscar dados
- montar relatórios
- lançar exceções de negócio

Isso mantém os Controllers extremamente simples.

---

## DTOs

A aplicação não expõe diretamente as Entities.

Todas as entradas e saídas utilizam DTOs.

Exemplo:

```
CreatePessoaRequest
```

↓

Recebe os dados enviados pelo Front-end.

```
PessoaResponse
```

↓

Retorna apenas as informações necessárias para o cliente.

Essa abordagem reduz acoplamento e melhora a segurança da API.

---

# Banco de Dados

Foi utilizado:

- SQLite
- Entity Framework Core
- Migrations

Relacionamento:

```
Pessoa (1)
      │
      │
      ▼
Transação (N)
```

Cada pessoa pode possuir várias transações.

---

# Regras de Negócio

Durante o desenvolvimento foram implementadas algumas regras reais.

## Menor de idade

Caso uma pessoa possua idade inferior a 18 anos:

✔ Pode cadastrar despesas.

❌ Não pode cadastrar receitas.

Essa validação acontece na camada de Service.

---

# Tratamento de Exceções

Foi implementado um Middleware responsável por interceptar todas as exceções da aplicação.

Ao invés de retornar erro interno para qualquer problema, a API responde corretamente:

```
404
Pessoa não encontrada
```

```
400
Regra de negócio violada
```

```
500
Erro interno
```

Essa abordagem evita repetição de código em todos os Controllers.

---

# Relatórios

A funcionalidade de relatório utiliza agregações sobre as transações.

Para cada pessoa são calculados:

- Total de receitas
- Total de despesas
- Saldo

Além disso são calculados os totais gerais da aplicação:

- Receita total
- Despesa total
- Saldo geral
- Quantidade de pessoas cadastradas

---

# Front-end

Tecnologias utilizadas

- React
- TypeScript
- Vite
- TailwindCSS

---

# Organização do Front

A estrutura também foi organizada por responsabilidade.

```
src
│
├── api
│
├── components
│
├── pages
│
├── types
│
├── assets
│
└── utils
```

---

# Componentização

Grande parte da interface foi construída utilizando componentes reutilizáveis.

Exemplos:

- Input
- Select
- Table
- Badge
- Card
- Title
- NavBar

Isso reduz duplicação de código e facilita manutenção.

---

# Consumo da API

Toda comunicação com o backend acontece através da pasta:

```
api/
```

Cada recurso possui seu próprio arquivo.

Exemplo:

```
api/pessoas.ts

api/transacoes.ts

api/relatorios.ts
```

A tipagem foi feita utilizando TypeScript.

Exemplo:

```
api.get<Pessoa[]>()
```

---

# Tipagem

Toda a aplicação utiliza interfaces para representar os objetos recebidos da API.

Exemplo:

```
Pessoa

Transacao

Relatorio
```

Isso reduz erros durante o desenvolvimento e melhora o suporte da IDE.

---

# Interface

A interface foi construída utilizando TailwindCSS.

Foram utilizados:

- Cards
- Badges
- Dashboard
- Tabelas reutilizáveis
- Inputs reutilizáveis
- Select reutilizável

Além disso foram adicionados indicadores visuais:

🟢 Receitas

🔴 Despesas

🟢 Saldo positivo

🔴 Saldo negativo

Alerta visual para menores de idade.

---

# Conceitos utilizados

Durante o desenvolvimento foram aplicados conceitos como:

- Clean Code
- SOLID (Responsabilidade Única)
- Injeção de Dependência
- DTO Pattern
- Feature Folder
- Middleware
- Entity Framework Core
- Dependency Injection
- Componentização
- Reutilização de código
- Tipagem forte com TypeScript
- Separação de responsabilidades

---

# Tecnologias

Backend

- ASP.NET Core 8
- Entity Framework Core
- SQLite
- Swagger

Frontend

- React
- TypeScript
- TailwindCSS
- Axios
- Vite

---

# Objetivo do projeto

Este projeto foi desenvolvido com foco em demonstrar conhecimentos em desenvolvimento Full Stack utilizando tecnologias modernas do ecossistema .NET e React.

Mais do que entregar uma aplicação funcional, o objetivo foi aplicar boas práticas de arquitetura, organização de código, separação de responsabilidades e componentização, buscando uma estrutura próxima à utilizada em projetos profissionais.

# ADA — Alertas de Desaparecidos em Angola

**ADA** é uma aplicação móvel que visa apoiar a prevenção e resposta a casos de desaparecimento de pessoas em Angola, através de três pilares funcionais principais:

- 📍 **Localização Familiar Privada** — partilha de localização em tempo real dentro de grupos de confiança (família/amigos), com deteção de entrada/saída de áreas seguras (geofencing).
- 📢 **Alertas Comunitários por Proximidade** — criação e distribuição de alertas de pessoas desaparecidas para utilizadores próximos da última localização conhecida, com expansão progressiva do raio de busca ao longo do tempo.
- 🔎 **Rastreamento Colaborativo por Avistamentos** — registo de avistamentos reportados pela comunidade, permitindo reconstruir o possível trajeto da pessoa desaparecida.

Este repositório contém o **backend** do MVP do ADA, responsável por expor a API REST, gerir a comunicação em tempo real e integrar com os serviços de notificação push.

---

## Stack Tecnológica

| Componente | Tecnologia |
|---|---|
| Runtime | Node.js |
| Framework HTTP | Express.js |
| Tempo real | Socket.IO |
| Base de dados | PostgreSQL + PostGIS (dados geoespaciais) |
| ORM | Sequelize |
| Autenticação | JWT (JSON Web Tokens) |
| Notificações push | Firebase Cloud Messaging (FCM) |
| Linting / Formatação | ESLint + Prettier |
| Frontend (repositório separado) | Flutter |

---

## Equipa

| Nome | Função |
|---|---|
| Carlos Neto | Backend |
| Adianeth Tomás | Backend |

---

## Pré-requisitos

Antes de começar, garante que tens instalado na tua máquina:

- [Node.js](https://nodejs.org/) (versão LTS mais recente recomendada)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) e Docker Compose (para correr o PostgreSQL + PostGIS localmente)
- Um cliente de API para testes (ex.: [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/)) — opcional, mas recomendado

---

## Guia de Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/Jodelf1/ada.git
cd ada
```

### 2. Instalar as dependências

```bash
npm install
```

Isto instala todas as dependências listadas no `package.json` (Express, Sequelize, Socket.IO, JWT, etc.) e as ferramentas de desenvolvimento (nodemon, ESLint, Prettier).

### 3. Configurar as variáveis de ambiente

Copia o ficheiro de exemplo e ajusta os valores conforme necessário:

```bash
cp .env.example .env
```

No Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

Abre o `.env` e preenche os valores (credenciais da base de dados, segredo do JWT, etc.):

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ada_dev
DB_USER=ada_user
DB_PASSWORD=a_tua_password
JWT_SECRET=um_segredo_forte_e_unico
JWT_EXPIRES_IN=7d
```

> ⚠️ O ficheiro `.env` nunca deve ser enviado para o Git — já está incluído no `.gitignore`.

### 4. Levantar a base de dados (PostgreSQL + PostGIS via Docker)

```bash
docker compose up -d
```

Confirma que o container está a correr:

```bash
docker ps
```

Ativa a extensão PostGIS (apenas na primeira vez que a base de dados é criada):

```bash
docker exec -it ada_db psql -U ada_user -d ada_dev -c "CREATE EXTENSION IF NOT EXISTS postgis;"
```

### 5. Correr as migrations do Sequelize

```bash
npx sequelize-cli db:migrate
```

*(Este passo só se aplica depois de os modelos/migrations existirem — tarefas 1.3 e 1.4 do roadmap.)*

### 6. Arrancar o servidor em modo de desenvolvimento

```bash
npm run dev
```

O servidor fica disponível em:

```
http://localhost:3000
```

Confirma que está tudo a funcionar acedendo ao endpoint de health check:

```
http://localhost:3000/health
```

Deves receber uma resposta semelhante a:

```json
{
  "status": "ok",
  "service": "ADA backend"
}
```

---

## Scripts Disponíveis

| Script | Comando | Descrição |
|---|---|---|
| `npm start` | `node src/server.js` | Arranca o servidor em modo produção (sem reinício automático) |
| `npm run dev` | `nodemon src/server.js` | Arranca o servidor em modo desenvolvimento, reiniciando automaticamente a cada alteração |
| `npm run lint` | `eslint src/**/*.js` | Analisa o código à procura de erros e más práticas |
| `npm run format` | `prettier --write "src/**/*.js"` | Reformata automaticamente o código de acordo com as regras do Prettier |

---

## Estrutura do Projeto

```
ada/
├── src/
│   ├── config/          # Configuração da base de dados e variáveis de ambiente
│   ├── controllers/     # Lógica dos endpoints (auth, users, groups, alerts...)
│   ├── models/           # Modelos Sequelize (User, Group, Alert, Sighting...)
│   ├── routes/           # Definição das rotas Express
│   ├── services/         # Lógica de negócio reutilizável (ex: notificationService)
│   ├── middlewares/      # Middlewares (ex: authGuard, tratamento de erros)
│   ├── sockets/          # Handlers de eventos Socket.IO
│   └── server.js         # Ponto de entrada da aplicação
├── tests/                # Testes automatizados
├── .env                  # Variáveis de ambiente (não versionado)
├── .env.example          # Modelo de variáveis de ambiente
├── .gitignore
├── docker-compose.yml    # Configuração do PostgreSQL + PostGIS
├── eslint.config.js
├── .prettierrc
└── package.json
```

---

## Fluxo de Trabalho Recomendado

Antes de cada commit, corre:

```bash
npm run format
npm run lint
```

Isto garante consistência de estilo entre os dois developers e evita subir código com erros óbvios.

---

## Roadmap de Desenvolvimento

O desenvolvimento do backend está organizado em 8 semanas, cobrindo desde a fundação da arquitetura até ao deploy em ambiente de staging. Consulta o documento **"Roadmap de Desenvolvimento do Backend"** para o detalhe completo das tarefas, responsáveis e critérios de aceitação de cada semana.

---

## Licença

Projeto académico desenvolvido no âmbito do IEEE UA Student Branch e do grupo NeRD, Universidade de Aveiro.
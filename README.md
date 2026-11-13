# AdegaGo — Frontend

Catálogo digital para divulgação e consulta de produtos de adegas e pequenos estabelecimentos de bebidas
(Projeto Integrador universitário). Esta aplicação React é a interface do sistema e usa o **Firebase**
(Cloud Firestore e Authentication) para guardar os dados e autenticar o administrador.

> A infraestrutura (regras de segurança, emuladores, publicação e configuração do Firebase) fica no
> repositório irmão **`adegago-backend`**. **Leia o README dele** para configurar o Firebase, criar o
> administrador e publicar o sistema.

## O que o AdegaGo é (e não é)

É um catálogo de **consulta**: o cliente vê produtos, preços, categorias, promoções e a disponibilidade
**informada manualmente pelo administrador** (última informação registrada, não é estoque em tempo real).

Não implementa: carrinho, compras, pedidos, pagamentos, frete, entregas, cadastro de clientes, histórico,
fidelidade, integração com mensageiros, gestão financeira, controle quantitativo de estoque ou integração
com sistemas externos.

## Tecnologias

React 19 (JavaScript/JSX), Vite, React Router, CSS puro e o **SDK oficial do Firebase** (`firebase`) para
Firestore e Authentication.

## Instalação e execução

Requisitos: Node.js 20.19+ (ou 22.12+) e npm.

```bash
npm install
```

Há **dois modos** de executar:

| Modo | Comando | Usa | Para quê |
| --- | --- | --- | --- |
| **Emuladores** (recomendado para desenvolver) | `npm run dev:emulador` | Firebase **simulado** no seu computador | Testar sem conta e sem risco para dados reais |
| **Firebase real** | `npm run dev` | Seu projeto Firebase (precisa do `.env`) | Verificar o ambiente real |

### Modo emuladores

Precisa dos emuladores ligados (Java 21+). No repositório `adegago-backend`:

```bash
npm install
npm run emuladores            # terminal 1
# terminal 2 (defina um e-mail e uma senha de TESTE à sua escolha):
ADMIN_EMAIL=admin@teste.com ADMIN_SENHA=senha-de-teste npm run emuladores:dados
```

Depois, neste repositório: `npm run dev:emulador` → http://localhost:5173. Detalhes (inclusive PowerShell)
no README do backend, seção 9.

### Modo Firebase real

Copie `.env.example` para `.env` e preencha os quatro valores do app Web do seu projeto (backend, seção 11):

| Variável | Descrição |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | Chave de API do app Web (identificador público, não é senha) |
| `VITE_FIREBASE_AUTH_DOMAIN` | Domínio de autenticação do projeto |
| `VITE_FIREBASE_PROJECT_ID` | ID do projeto |
| `VITE_FIREBASE_APP_ID` | ID do app Web |
| `VITE_USE_FIREBASE_EMULATORS` | `false` no Firebase real (`true` só no modo emuladores) |

Sem esses valores, o app abre, mas exibe uma mensagem de erro ao tentar carregar os produtos.
O arquivo `.env` **não é versionado**. O `.env.emulador` é versionado porque contém apenas valores de
demonstração dos emuladores.

### Outros comandos

```bash
npm run build        # gera dist/ (esta pasta é a que o repositório adegago-backend publica)
npm run preview      # serve o build localmente
```

## Rotas

| Rota | Tela | Acesso |
| --- | --- | --- |
| `/` | Catálogo público | Livre, sem login |
| `/admin/login` | Login do administrador | Livre |
| `/admin` | Painel com indicadores | Administrador |
| `/admin/produtos` | Gerenciamento de produtos | Administrador |
| `/admin/produtos/novo` | Cadastro de produto | Administrador |
| `/admin/produtos/:id/editar` | Edição de produto | Administrador |

Em hospedagem estática, o servidor deve devolver `index.html` para rotas desconhecidas. O `firebase.json` do
backend já faz isso.

## Funcionalidades

**Área pública**: listagem em cartões; pesquisa por nome (ignora acentos e maiúsculas); filtro por
disponibilidade; destaque de promoções com preço normal e promocional; mensagens para "nenhum produto
encontrado" e "nenhum produto cadastrado"; mensagem de erro com botão "Tentar novamente" quando não há
conexão.

**Área administrativa**: login real (Firebase Authentication); sessão restaurada ao reabrir o site e
encerrada automaticamente se expirar; painel com indicadores; cadastro, edição e exclusão (com confirmação);
alteração de disponibilidade com um clique; ação rápida "Preço e promoção"; validações de campos
obrigatórios, preços negativos/zerados/inválidos e preço promocional maior ou igual ao normal.

## Como o frontend se integra ao Firebase

A interface não mudou: apenas a camada de dados foi trocada, mantendo os mesmos nomes de funções e formatos.

```
Páginas/Componentes ──► Contextos ──► Serviços ──► Firebase (Firestore / Authentication)
                    ProdutosContext   produtosService.js
                    AuthContext       authService.js
```

- `src/config/firebase.js` inicializa o Firebase (e liga os emuladores quando `VITE_USE_FIREBASE_EMULATORS=true`).
- `src/services/produtosService.js` converte entre o formato do app e o do Firestore:
  - `id` = ID do documento; `emPromocao` **não é gravado** (é `precoPromocional != null`);
  - `precoPromocional`/`imagem` só existem quando têm valor (a remoção usa `deleteField()`);
  - `createdAt`/`updatedAt` são gerados pelo servidor (`serverTimestamp()`);
  - após gravar, o documento é relido para devolver o produto completo ao contexto.
- `src/services/authService.js` faz login/logout, observa a sessão e confirma que a conta é de administrador
  (existe `admins/{uid}`); contas sem esse documento são desconectadas.
- `src/services/erros.js` traduz erros do Firebase em mensagens em português (sem permissão, sessão expirada,
  sem conexão, limite diário atingido, e-mail/senha incorretos etc.); as telas exibem essas mensagens.

> **Segurança:** esconder telas no React **não protege os dados**. A proteção real está nas **Security
> Rules** do Firestore (repositório `adegago-backend`). Mesmo que alguém altere o código no navegador, as
> regras recusam qualquer escrita de quem não é administrador.

### Alterações feitas no frontend original (e por quê)

| Arquivo | Alteração | Motivo |
| --- | --- | --- |
| `package.json` | dependência `firebase`; scripts `dev:emulador` e `build:emulador` | Usar o SDK; rodar com emuladores |
| `src/config/env.js` | variáveis `VITE_FIREBASE_*` no lugar de `VITE_API_URL` | Configurar o Firebase |
| `src/config/firebase.js` *(novo)* | Inicialização do Firebase | Configuração central |
| `src/services/produtosService.js` | Reescrito com Firestore (mesmas funções) | Persistência real |
| `src/services/authService.js` | Reescrito com Firebase Authentication | Login real |
| `src/services/erros.js` *(novo)* | Tradução de erros | Mensagens claras |
| `src/data/produtosMock.js` | **Removido** (dados de exemplo foram para `adegago-backend/seed`) | Fim dos dados fictícios |
| `src/data/categorias.js` *(novo)* | Lista de categorias (estava no arquivo removido) | Preservar os formulários |
| `src/context/AuthContext.jsx` | Estado `carregando`; observa a sessão do Firebase | Autenticação é assíncrona |
| `src/components/RotaAdmin.jsx` | Aguarda a verificação da sessão antes de redirecionar | Evitar redirecionamento indevido |
| `src/context/ProdutosContext.jsx`, `ProdutoForm.jsx`, `LoginPage.jsx`, `ProdutosAdminPage.jsx` | Exibem `erro.message` em vez de texto fixo | Mensagens específicas |
| `LoginPage.jsx`, `AdminLayout.jsx`, `PublicLayout.jsx`, `ProdutosAdminPage.jsx`, `App.jsx` | Textos que diziam "simulado/fictício" | Já não são verdade |
| `.env.example`, `.env.emulador`, `.gitignore` | Variáveis do Firebase | Configuração |

Componentes de interface, formulários, estilos e fluxos de navegação **não foram reescritos**.

## Estrutura de arquivos

```
adegago-frontend/
├── .env.example  .env.emulador  .gitignore  index.html  package.json  vite.config.js
├── public/                 # favicon e ilustrações dos produtos de exemplo (SVG)
└── src/
    ├── main.jsx  App.jsx
    ├── config/             # env.js (variáveis) e firebase.js (inicialização)
    ├── data/categorias.js
    ├── services/           # produtosService, authService, erros  (acesso ao Firebase)
    ├── context/            # ProdutosContext, AuthContext
    ├── hooks/  utils/      # título/foco, formatação, validação
    ├── components/         # layouts, cartão, selos, formulário, modais...
    ├── pages/              # CatalogoPage, NaoEncontradoPage, admin/*
    └── styles/
```

## Acessibilidade

HTML semântico, link "Ir para o conteúdo", rótulos associados aos campos, mensagens de erro ligadas aos
campos (`aria-describedby`, `aria-invalid`), foco movido ao primeiro erro e ao título ao trocar de página,
foco visível, diálogos com o elemento nativo `<dialog>`, disponibilidade e promoção com texto e ícone (não só
cor) e contraste calculado conforme WCAG 2.1 AA. Verificação automatizada com axe-core (em jsdom): 0
violações nos estados testados. Ainda é recomendável testar com leitor de tela e só com teclado.

## Limitações conhecidas

- O catálogo carrega os produtos **uma vez** ao abrir a página (sem atualização em tempo real); recarregue
  para ver mudanças feitas por outra pessoa.
- Imagens apenas por **URL** (upload exigiria Cloud Storage, que não é gratuito).
- Sem filtro por categoria, ordenação ou paginação (fora do escopo definido).
- O pacote do frontend ficou maior com o SDK do Firebase (≈ 264 KB compactados), o que pesa na cota de
  transferência do Hosting gratuito (ver backend, seção 13).
- Sem internet, operações de escrita são recusadas com aviso; se a conexão cair no meio da gravação, ela pode
  ser aplicada depois (ver backend, seção 15).
- Não há testes automatizados neste repositório; os testes das regras ficam no `adegago-backend`.
- A responsividade foi construída com grade fluida e menus recolhíveis, mas deve ser conferida em navegador
  real (360 px, 768 px e 1280 px ou mais).

## Repositório Git

Repositório independente `adegago-frontend`:

```bash
git init
git add .
git commit -m "Frontend do AdegaGo integrado ao Firebase"
git branch -M main
git remote add origin <URL-do-repositório-adegago-frontend>
git push -u origin main
```

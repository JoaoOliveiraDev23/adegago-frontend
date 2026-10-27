# AdegaGo — Catálogo Digital para Adegas

O AdegaGo é um projeto desenvolvido como parte do Projeto Integrador universitário. A proposta é criar uma aplicação web para facilitar a consulta de produtos, preços, disponibilidade e promoções de pequenas adegas e estabelecimentos de bebidas.

A ideia é utilizar a tecnologia para ajudar esses estabelecimentos a divulgar seus produtos de forma organizada, oferecendo aos clientes um catálogo digital de consulta e aos responsáveis pelo negócio uma área para atualizar as informações dos produtos.

O desenvolvimento será realizado por etapas, começando pela interface e evoluindo posteriormente para a integração com banco de dados, API e autenticação.

## Objetivos

- Desenvolver um catálogo digital de fácil utilização.
- Permitir a consulta de produtos, preços, categorias, disponibilidade e promoções.
- Criar uma área administrativa para o gerenciamento dos produtos.
- Desenvolver uma interface responsiva, acessível e organizada.
- Aplicar os conhecimentos adquiridos durante a graduação em um projeto prático.

## Etapa atual: Frontend

Nesta primeira etapa, o foco está no desenvolvimento da interface e das principais funcionalidades do sistema. Para isso, são utilizados dados fictícios que permitem demonstrar e avaliar o funcionamento das telas.

O projeto foi organizado de forma a facilitar a futura integração com um backend, responsável pelo processamento das informações, uma API para comunicação entre as partes e um banco de dados para armazenamento permanente.

**Importante:** o login e as operações administrativas são simulados. Os dados utilizados são fictícios e as alterações realizadas nos produtos ficam armazenadas apenas na memória do navegador, sendo perdidas ao recarregar a página. Portanto, esta versão não deve ser utilizada para administrar dados reais.

## Funcionalidades

### Catálogo público

- Listagem de produtos com nome, descrição, categoria e preço.
- Exibição da disponibilidade informada pelo estabelecimento.
- Identificação de produtos em promoção e apresentação do preço promocional.
- Pesquisa de produtos pelo nome.
- Filtro por disponibilidade.
- Mensagens para pesquisas sem resultados e catálogos sem produtos cadastrados.
- Interface adaptada para diferentes tamanhos de tela.

### Área administrativa

- Tela de login demonstrativa.
- Painel com indicadores de produtos cadastrados, disponíveis, indisponíveis e em promoção.
- Listagem de produtos em tabela ou cartões, conforme o tamanho da tela.
- Cadastro, edição e exclusão de produtos.
- Atualização da disponibilidade.
- Alteração de preços e gerenciamento de promoções.
- Validação dos campos dos formulários.

Os indicadores são calculados a partir dos dados disponíveis na aplicação e não representam informações de um estoque real.

## Tecnologias utilizadas

- React 19
- JavaScript e JSX
- Vite
- React Router
- HTML5 semântico
- CSS
- Git e GitHub

O React é utilizado para organizar a interface em componentes reutilizáveis, enquanto o Vite fornece o ambiente de desenvolvimento. O React Router permite a navegação entre as páginas, e o CSS é responsável pela apresentação e adaptação da interface aos diferentes dispositivos.

## Acessibilidade e responsividade

Durante o desenvolvimento, são considerados aspectos de acessibilidade e facilidade de uso, como:

- Utilização de elementos HTML semânticos.
- Associação entre campos de formulário e seus rótulos.
- Navegação por teclado e indicação visual de foco.
- Mensagens de validação nos formulários.
- Identificação de disponibilidade e promoções por texto, sem depender apenas das cores.
- Textos alternativos para imagens.
- Atenção ao contraste e à redução de animações.

A interface também considera diferentes tamanhos de tela, buscando manter a navegação e as funcionalidades utilizáveis em computadores, tablets e celulares.

## Próximas etapas

Após a conclusão e avaliação do frontend, o projeto poderá avançar para as seguintes atividades:

- Desenvolvimento do backend.
- Criação de uma API para comunicação com o frontend.
- Integração com banco de dados para armazenamento permanente dos produtos.
- Implementação de autenticação e autorização reais para a área administrativa.
- Criação de testes para verificar as principais funcionalidades.
- Publicação da aplicação em ambiente de nuvem.

Essas etapas fazem parte da evolução planejada para o projeto e serão desenvolvidas conforme o andamento dos trabalhos.

## Limitações atuais

Por se tratar da primeira etapa, algumas funcionalidades ainda não estão disponíveis:

- Autenticação real e proteção efetiva da área administrativa.
- Armazenamento permanente dos dados.
- Envio de arquivos de imagem.
- Integração com sistemas externos.
- Consulta ao estoque físico em tempo real.
- Funcionalidades de compras, pagamentos, pedidos e entregas.
- Testes automatizados.

A disponibilidade dos produtos corresponde à informação registrada manualmente no catálogo, não representando uma consulta automática ao estoque do estabelecimento.

## Como executar o projeto

### Pré-requisitos

- Node.js 20.19+ ou 22.12+.
- npm.

### Instalação

Clone o repositório, acesse a pasta do projeto e instale as dependências:

```bash
npm install
```

Para iniciar o ambiente de desenvolvimento:

```bash
npm run dev
```

O endereço local será informado pelo Vite no terminal, normalmente `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar localmente a versão gerada:

```bash
npm run preview
```

## Organização do projeto

O código está organizado por responsabilidades para facilitar a manutenção e a evolução da aplicação.

- `src/components/`: componentes reutilizáveis da interface.
- `src/pages/`: páginas do catálogo e da área administrativa.
- `src/services/`: serviços de acesso aos dados e simulação de autenticação.
- `src/context/`: gerenciamento de estados compartilhados.
- `src/data/`: dados fictícios utilizados nesta etapa.
- `src/config/`: configurações da aplicação.
- `src/hooks/`: hooks reutilizáveis.
- `src/utils/`: funções auxiliares, formatação e validações.
- `src/styles/`: arquivos de estilização.

## Considerações finais

O AdegaGo é uma oportunidade de aplicar os conhecimentos adquiridos durante a graduação no desenvolvimento de uma aplicação web voltada a uma necessidade prática: facilitar a consulta e a divulgação de produtos de pequenos estabelecimentos.

A construção por etapas permite trabalhar desde a organização do código e o desenvolvimento da interface até a futura integração entre frontend, backend e banco de dados.

Este repositório reúne a primeira versão do projeto e será atualizado conforme o desenvolvimento avançar.

**Projeto Integrador universitário — AdegaGo.**
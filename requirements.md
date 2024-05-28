# Requisitos do Projeto

## Visão Geral
Descrição geral do projeto e seus objetivos.

## Funcionalidades Principais

### Frontend
- [ ] Interface de usuário em React
- [ ] Input para buscar tweets por tópico ou hashtag
- [ ] Exibição de tweets com análise de sentimento
- [ ] Gráficos e estatísticas de sentimentos

### Backend
- [ ] Coleta de tweets via API do Twitter
- [ ] Análise de sentimento usando TextBlob
- [ ] Armazenamento de tweets e resultados no MongoDB
- [ ] API RESTful para fornecer dados ao frontend

## Detalhes Técnicos

### Frontend
- **Linguagem**: JavaScript
- **Framework**: React
- **Ferramentas**: npm, webpack, axios

### Backend
- **Linguagem**: Python
- **Framework**: Flask
- **Bibliotecas**: Tweepy, TextBlob, pymongo

## Configuração do Ambiente

### Dependências
- Docker
- Docker Compose
- Node.js
- Python

### Variáveis de Ambiente
- `TWITTER_API_KEY`: Chave da API do Twitter
- `TWITTER_API_SECRET_KEY`: Chave secreta da API do Twitter
- `TWITTER_ACCESS_TOKEN`: Token de acesso do Twitter
- `TWITTER_ACCESS_SECRET`: Token secreto de acesso do Twitter

## Fluxo de Trabalho
1. Configurar o ambiente de desenvolvimento
2. Implementar a coleta de tweets no backend
3. Implementar a análise de sentimento no backend
4. Criar a interface de usuário no frontend
5. Integrar o frontend com o backend
6. Testar e validar o sistema

## Funcionalidades Principais

### Frontend

#### Input de Busca
- **Descrição**: Campo de texto para entrada de tópico ou hashtag a ser buscado.
- **Requisitos**:
  - [ ] Deve permitir a entrada de texto pelo usuário.
  - [ ] Deve ter um botão para iniciar a busca.
  - [ ] Deve exibir uma mensagem de erro se o campo estiver vazio.

#### Exibição de Tweets
- **Descrição**: Área para exibir os tweets buscados e seus sentimentos.
- **Requisitos**:
  - [ ] Deve exibir cada tweet em um cartão.
  - [ ] Cada cartão deve mostrar o texto do tweet.
  - [ ] Cada cartão deve indicar o sentimento do tweet (positivo, negativo, neutro).

### Backend

#### Coleta de Tweets
- **Descrição**: Módulo para coletar tweets da API do Twitter.
- **Requisitos**:
  - [ ] Deve usar a biblioteca Tweepy.
  - [ ] Deve autenticar usando as chaves de API do Twitter.
  - [ ] Deve permitir busca por tópico ou hashtag.
  - [ ] Deve retornar até 100 tweets por busca.

#### Análise de Sentimento
- **Descrição**: Módulo para analisar o sentimento dos tweets coletados.
- **Requisitos**:
  - [ ] Deve usar a biblioteca TextBlob.
  - [ ] Deve classificar os tweets em positivo, negativo ou neutro.
  - [ ] Deve armazenar os resultados no MongoDB.

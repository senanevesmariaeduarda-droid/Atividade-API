GAMETRACK API

Projeto de um sistema CRUD de jogos utilizando HTML, CSS, JavaScript e JSON Server.

ARQUIVOS DO PROJETO

index.html
style.css
script.js
db.json
README.txt

FUNCIONALIDADES

- Cadastro de jogos
- Listagem de jogos
- Edição de jogos
- Exclusão de jogos
- Pesquisa por título
- Filtro por status
- Dashboard com quantidade de jogos
- Validação dos campos
- Mensagens de sucesso e erro

API

A API foi criada utilizando JSON Server.

URL:
http://localhost:3000/jogos

COMO EXECUTAR

1. Abrir a pasta do projeto no VS Code.

2. Abrir o terminal.

3. Executar:

npx json-server --watch db.json

4. Acessar o projeto pelo navegador.

TESTES REALIZADOS

GET /jogos
Teste realizado com sucesso.

GET /jogos/1
Teste realizado com sucesso.

POST /jogos
Teste realizado com sucesso.

PUT /jogos/ID
Teste realizado com sucesso.

DELETE /jogos/ID
Teste realizado com sucesso.

PESQUISA
Pesquisa por título testada com sucesso.

FILTRO
Filtro por status testado com sucesso.

PESQUISA + FILTRO
Pesquisa e filtro utilizados juntos com sucesso.

VALIDAÇÕES
Campos obrigatórios e nota de 0 a 10 testados com sucesso.

ERRO DA API
JSON Server desligado e mensagem de erro testada com sucesso.
## TFC - Trybe Futebol Clube

O TFC é um site informativo sobre partidas e classificações de futebol! ⚽️

Neste projeto foi utilizado Typescript e o framework Express.js para criar uma API RESTful. Com esta API, você pode realizar operações de CRUD (Criar, Ler, Atualizar e Excluir) para usuários, times e partidas. Para armazenamento das informações, utilizamos o Sequelize como ORM (Object-Relational Mapping) juntamente com um container Docker do MySQL, dessa forma, o banco de dados fica isolado.

Através da API, você poderá acompanhar a classificação dos seus times preferidos e visualizar seu desempenho como mandante, visitante ou geral (visitante e mandante). Além disso, é possível ver partidas em andamento e finalizadas, filtrando as informações conforme sua preferência.

<details>
<summary><strong> Rodando com Docker 🐳 </strong></summary><br />


Para executar a aplicação na sua máquina local, executar o comando npm run compose:up na raiz do projeto, para utilizar o arquivo docker-compose.yml. Isso permitirá que você inicie todos os contêineres necessários para que a aplicação funcione corretamente. Certifique-se de que o Docker esteja instalado em sua máquina antes de executar o comando.

</details>


<details>
 <summary><strong>Pastas e Arquivos feitos por mim </strong></summary><br />
  <ul>
    <li> src/database/migrations/* </li>
    <li> src/interfaces/* </li>
    <li> src/middleware/* </li>
    <li> src/models/* </li>
    <li> src/routes/* </li>
    <li> src/services/* </li>
    <li> src/tests/* </li>
    <li> src/utils/* </li>
  </ul>
 </details>

<details>
  <summary><strong>Tecnologias Utilizadas</strong></summary><br />
  <ul>
    <li> Typescript </li>
    <li> Express </li>
    <li> Sequelize </li>
    <li> Json web token (JWT) </li>
    <li> Docker </li>
    <li> Mocha </li>
    <li> Chai </li>
  </ul>
<br />
</details>

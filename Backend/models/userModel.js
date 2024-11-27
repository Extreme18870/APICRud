const createConnection = require("../db"); // Importa a função para criar a conexão com o banco de dados
const { Request, TYPES } = require("tedious"); // Importa as classes necessárias do tedious

// GET
  // Todos
  exports.getAllusers = (callback) => {
    const connection = createConnection(); // Cria a conexão com o banco de dados
    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null); // Trata erros de conexão
      }
      const query = `SELECT * FROM users1`; // SQL para buscar todas os usuários
      const request = new Request(query, (err, rowCount) => {
        if (err) {
          return callback(err, null); // Trata erros de execução da consulta
        }

        if (rowCount === 0) {
          return callback(null, []); // Retorna um array vazio se não houver registros
        }
      });

      // Evento 'row' para capturar todas as linhas de resultados
      const result = []; // Variável para armazenar os resultados
      request.on("row", (columns) => {
        result.push({
            id: columns[0].value,
            name: columns[1].value,
            email: columns[2].value,
            contact: columns[3].value,
        });
      });

      // Ao completar a consulta, retorna o array com todos os usuários
      request.on("requestCompleted", () => {
        callback(null, result); // Retorna o array de resultados
      });
      connection.execSql(request); // Executa a consulta
    });

    connection.connect(); // Inicia a conexão
  };

  // CPF
  exports.getProfessorByCpf = (id, callback) => {
    const connection = createConnection(); // Cria a conexão com o banco de dados

    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null); // Trata erros de conexão
      }

      // Consulta SQL para buscar um aluno pelo RM
      const query = `SELECT * FROM users1 WHERE id = @id`;
      const request = new Request(query, (err) => {
        if (err) {
          return callback(err, null); // Trata erros de execução da consulta
        }
      });

      // Adiciona o parâmetro RM
      request.addParameter("cpf", TYPES.VarChar, cpf);

      // Evento 'row' para capturar a linha de resultado
      let users= null;
      request.on("row", (columns) => {
        professor = {
            id: columns[0].value,
            name: columns[1].value,
            email: columns[2].value,
            contact: columns[3].value,
        };
      });

      // Ao completar a consulta, retorna o aluno encontrado
      request.on("requestCompleted", () => {
        callback(null, users); // Retorna o aluno encontrado ou null se não existir
      });

      connection.execSql(request); // Executa a consulta
    });

    connection.connect(); // Inicia a conexão
  };

  // Nome
  exports.getProfessorByNome = (name, callback) => {
    const connection = createConnection(); // Cria a conexão com o banco de dados

    connection.on("connect", (err) => {
      if (err) {
        return callback(err, null); // Trata erros de conexão
      }


      // Consulta SQL para buscar um aluno pelo nome
      const query = `SELECT * FROM Professores WHERE name = @name`;
      const request = new Request(query, (err) => {
        if (err) {
          return callback(err, null); // Trata erros de execução da consulta
        }
      });

      // Adiciona o parâmetro nome
      request.addParameter("name", TYPES.VarChar, name);

      // Evento 'row' para capturar a linha de resultado
      let users = null;
      request.on("row", (columns) => {
        users = {
          id: columns[0].value,
          name: columns[1].value,
          email: columns[2].value,
          contact: columns[3].value,
        };
      });

      // Ao completar a consulta, retorna o aluno encontrado
      request.on("requestCompleted", () => {
        callback(null, users); // Retorna o aluno encontrado ou null se não existir
      });

      connection.execSql(request); // Executa a consulta
    });

    connection.connect(); // Inicia a conexão
  };

//.
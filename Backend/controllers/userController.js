const userModel = require("../models/userModel")

exports.getUser =(req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err){
            res.status(500).send("Erro ao buscar usuários")
        } else{
            res.json(users)
        }
    })
}
exports .getUserById = (req, res) => {
    const { id } = req.params; // Extrai o RM dos parâmetros da URL
    userModel.getUserById(id, (err, users) => {
      if (err) {
        res.status(500).send("Erro ao buscar aluno!"); // Retorna um erro 500 se algo deu errado
      } else if (!users) {
        res.status(404).send("Aluno não encontrado!"); // Retorna 404 se o aluno não for encontrado
      } else {
        res.json(users); // Retorna o aluno encontrado em formato JSON
      }
    });
  };
  exports.getUserByName = (req, res) => {
    const { name } = req.params; // Extrai o RM dos parâmetros da URL
    userModel.getUserbyName(name, (err, users) => {
      if (err) 
        return res.status(500).send("Erro ao buscar aluno!"); 
        res.json(users);
      
    });
  };
  
// Função para lidar com a requisição de criação de usuário
exports.createUser = (req, res) => {
    const data = req.body; // Extrai o nome do corpo da requisição
    userModel.createUser(data, (err) => {
    if (err) {
    res.status(500).send('Erro ao criar usuário' + err); // Retorna um erro 500 se algo deu errado
    } else {
    res.status(201).send('Usuário criado com sucesso'); // Retorna status 201 (criado) se bem-sucedido
    }
    });
    };
    // Função para lidar com a requisição de atualização de usuário
    exports.updateUser = (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da URL
    const data = req.body; // Extrai o nome do corpo da requisição
    userModel.updateUser(id, data, (err) => {
    if (err) {
    res.status(500).send('Erro ao atualizar usuário'); // Retorna um erro 500 se algo deu errado
    } else {
    res.send('Usuário atualizado com sucesso'); // Retorna uma mensagem de sucesso
    }
    });
    };
    // Função para lidar com a requisição de remoção de usuário
    exports.deleteUser = (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da URL
    userModel.deleteUser(id, (err) => {
        if (err) {
            res.status(500).send('Erro ao deletar usuário'); // Retorna um erro 500 se algo deu errado
            } else {
            res.send('Usuário deletado com sucesso'); // Retorna uma mensagem de sucesso
            }
            });
            };
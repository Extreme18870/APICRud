// Conecta o banco de dados

const { Connection } = require('tedious'); // Configuração da conexão com o banco de dados 
const config = { 
    server: 'localhost', // Substitua pelo endereço do servidor SQL 
    authentication: { 
        type: 'default', 
        options: { 
            userName: 'testesql', // Seu nome de usuário do SQL Server
            password: '12345', // Sua senha do SQL Server 
        }, 
    }, 
    options: { 
        database: 'Pyetro', // Nome do banco de dados que você quer acessar 
        encrypt: false, // Desativar criptografia (pode mudar se necessário)
        port: 1433, // Porta padrão do SQL Server
        trustServerCertificate: true // Necessário para evitar erro de SSL em ambiente local 
    }, 
}; 

// Função para criar uma nova conexão com o banco de dados
function createConnection() {
    return new Connection(config); // Retorna uma nova instância da classe Connection
}

module.exports = createConnection;
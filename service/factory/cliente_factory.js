const clienteService = require('../implementacao/cliente_service');

class ClienteFactory {
  criarServico() {
    return clienteService;
  }
}

const factory = new ClienteFactory();
module.exports = factory.criarServico();

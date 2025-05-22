let clientes = [];

function listar() {
  return clientes;
}

function buscarPorId(id) {
  const cliente = clientes.find(c => c.id === id);
  if (!cliente) throw { id: 404, message: 'Cliente não encontrado' };
  return cliente;
}

function inserir(cliente) {
  cliente.id = clientes.length + 1;
  cliente.compras = 0;
  clientes.push(cliente);
}

function atualizar(id, dados) {
  const cliente = clientes.find(c => c.id === id);
  if (!cliente) throw { id: 404, message: 'Cliente não encontrado' };
  cliente.nome = dados.nome;
  cliente.email = dados.email;
  cliente.compras = dados.compras;
  return cliente;
}

function remover(id) {
  const index = clientes.findIndex(c => c.id === id);
  if (index === -1) throw { id: 404, message: 'Cliente não encontrado' };
  clientes.splice(index, 1);
}

module.exports = {
  listar,
  buscarPorId,
  inserir,
  atualizar,
  remover
};

let comidas = [];

function listar() {
  return comidas;
}

function buscarPorId(id) {
  const comida = comidas.find(c => c.id === id);
  if (!comida) throw { id: 404, message: 'Comida não encontrada' };
  return comida;
}

function inserir(comida) {
  comida.id = comidas.length + 1;
  comidas.push(comida);
}

function atualizar(id, dados) {
  const comida = comidas.find(c => c.id === id);
  if (!comida) throw { id: 404, message: 'Comida não encontrada' };
  comida.nome = dados.nome;
  comida.ingredientes = dados.ingredientes;
  comida.preco = dados.preco;
  return comida;
}

function remover(id) {
  const index = comidas.findIndex(c => c.id === id);
  if (index === -1) throw { id: 404, message: 'Comida não encontrada' };
  comidas.splice(index, 1);
}

module.exports = {
  listar,
  buscarPorId,
  inserir,
  atualizar,
  remover
};

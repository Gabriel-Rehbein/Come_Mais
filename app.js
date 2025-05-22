const express = require('express');
const comidaFactory = require('./service/factory/comida_factory');
const clienteFactory = require('./service/factory/cliente_factory');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// ----- ROTAS COMIDAS -----
app.get('/comidas', (req, res) => res.json(comidaFactory.listar()));

app.get('/comidas/:id', (req, res) => {
  try {
    res.json(comidaFactory.buscarPorId(+req.params.id));
  } catch (err) {
    res.status(err.id || 500).json(err);
  }
});

app.post('/comidas', (req, res) => {
  try {
    comidaFactory.inserir(req.body);
    res.status(201).json(req.body);
  } catch (err) {
    res.status(err.id || 500).json(err);
  }
});

app.put('/comidas/:id', (req, res) => {
  try {
    const comidaAtualizada = comidaFactory.atualizar(+req.params.id, req.body);
    res.json(comidaAtualizada);
  } catch (err) {
    res.status(err.id || 500).json(err);
  }
});

app.delete('/comidas/:id', (req, res) => {
  try {
    comidaFactory.remover(+req.params.id);
    res.json({ mensagem: 'Comida deletada com sucesso' });
  } catch (err) {
    res.status(err.id || 500).json(err);
  }
});

// ----- ROTAS CLIENTES -----
app.get('/clientes', (req, res) => res.json(clienteFactory.listar()));

app.get('/clientes/:id', (req, res) => {
  try {
    res.json(clienteFactory.buscarPorId(+req.params.id));
  } catch (err) {
    res.status(err.id || 500).json(err);
  }
});

app.post('/clientes', (req, res) => {
  try {
    clienteFactory.inserir(req.body);
    res.status(201).json(req.body);
  } catch (err) {
    res.status(err.id || 500).json(err);
  }
});

app.put('/clientes/:id', (req, res) => {
  try {
    const clienteAtualizado = clienteFactory.atualizar(+req.params.id, req.body);
    res.json(clienteAtualizado);
  } catch (err) {
    res.status(err.id || 500).json(err);
  }
});

app.delete('/clientes/:id', (req, res) => {
  try {
    clienteFactory.remover(+req.params.id);
    res.json({ mensagem: 'Cliente deletado com sucesso' });
  } catch (err) {
    res.status(err.id || 500).json(err);
  }
});

// ----- Iniciar servidor -----
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// ---------------------- COMIDAS ----------------------
const formComida = document.getElementById('form-comida');
const listaComidas = document.getElementById('lista-comidas');

async function carregarComidas() {
  const res = await fetch('/comidas');
  const comidas = await res.json();
  listaComidas.innerHTML = '';
  comidas.forEach(comida => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${comida.nome}</strong> - ${comida.ingredientes} - R$ ${comida.preco.toFixed(2)}
      <button onclick="editarComida(${comida.id})">✏️</button>
      <button onclick="excluirComida(${comida.id})">🗑️</button>
    `;
    listaComidas.appendChild(li);
  });
}

formComida.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome-comida').value;
  const ingredientes = document.getElementById('ingredientes-comida').value;
  const preco = parseFloat(document.getElementById('preco-comida').value);

  await fetch('/comidas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, ingredientes, preco })
  });

  formComida.reset();
  carregarComidas();
});

async function excluirComida(id) {
  await fetch(`/comidas/${id}`, { method: 'DELETE' });
  carregarComidas();
}

async function editarComida(id) {
  const res = await fetch(`/comidas/${id}`);
  const comida = await res.json();

  const novoNome = prompt('Novo nome:', comida.nome);
  const novosIngredientes = prompt('Novos ingredientes:', comida.ingredientes);
  const novoPreco = prompt('Novo preço:', comida.preco);

  if (novoNome && novosIngredientes && novoPreco) {
    await fetch(`/comidas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: novoNome,
        ingredientes: novosIngredientes,
        preco: parseFloat(novoPreco)
      })
    });
    carregarComidas();
  }
}

// ---------------------- CLIENTES ----------------------
const formCliente = document.getElementById('form-cliente');
const listaClientes = document.getElementById('lista-clientes');

async function carregarClientes() {
  const res = await fetch('/clientes');
  const clientes = await res.json();
  listaClientes.innerHTML = '';
  clientes.forEach(cliente => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${cliente.nome}</strong> - ${cliente.email} - Compras: ${cliente.compras}
      <button onclick="editarCliente(${cliente.id})">✏️</button>
      <button onclick="excluirCliente(${cliente.id})">🗑️</button>
    `;
    listaClientes.appendChild(li);
  });
}

formCliente.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome-cliente').value;
  const email = document.getElementById('email-cliente').value;

  await fetch('/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email })
  });

  formCliente.reset();
  carregarClientes();
});

async function excluirCliente(id) {
  await fetch(`/clientes/${id}`, { method: 'DELETE' });
  carregarClientes();
}

async function editarCliente(id) {
  const res = await fetch(`/clientes/${id}`);
  const cliente = await res.json();

  const novoNome = prompt('Novo nome:', cliente.nome);
  const novoEmail = prompt('Novo email:', cliente.email);
  const novasCompras = prompt('Nova quantidade de compras:', cliente.compras);

  if (novoNome && novoEmail && novasCompras) {
    await fetch(`/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: novoNome,
        email: novoEmail,
        compras: parseInt(novasCompras)
      })
    });
    carregarClientes();
  }
}

// Inicializar listas ao abrir a página
carregarComidas();
carregarClientes();

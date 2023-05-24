// Função para preencher a tabela com os dados dos usuários
function fillUserTable(users) {
  var tableBody = document.getElementById('userTableBody');

  // Limpa o conteúdo atual da tabela
  tableBody.innerHTML = '';

  // Preenche a tabela com os dados dos usuários
  users.forEach(function (user) {
    var row = document.createElement('tr');

    var idCell = document.createElement('td');
    idCell.textContent = user.id;
    row.appendChild(idCell);

    var nameCell = document.createElement('td');
    nameCell.textContent = user.name;
    row.appendChild(nameCell);

    var emailCell = document.createElement('td');
    emailCell.textContent = user.email;
    row.appendChild(emailCell);

    var phoneCell = document.createElement('td');
    phoneCell.textContent = user.phone;
    row.appendChild(phoneCell);

    tableBody.appendChild(row);
  });
}

// Função para realizar a consulta de usuário com base no username
function searchUserByUsername(username) {
  // Limpa o valor do input de username
  document.getElementById('usernameInput').value = '';

  // Realiza a requisição à API para obter o usuário com o username informado
  fetch(`https://frontend-test.frenet.dev/v1/user/${username}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Verifica se o usuário foi encontrado
      if (data) {
        // Preenche a tabela com os dados do usuário encontrado
        fillUserTable([data]);
      } else {
        // Limpa a tabela caso o usuário não seja encontrado
        fillUserTable([]);
        alert('Usuário não encontrado.');
      }
    })
    .catch(function (error) {
      console.error('Erro ao consultar usuário:', error);
    });
  }

// Manipula o evento de envio do formulário de consulta
document
  .getElementById('searchForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('usernameInput').value.trim();

    // Verifica se o username foi informado
    if (username) {
      searchUserByUsername(username);
    } else {
      alert('Por favor, informe um username válido.');
    }
  });

// Função para preencher a tabela com os dados dos usuários
function fillUserTable(users) {
  var tableBody = document.getElementById('userTableBody');
  tableBody.innerHTML = ''; // Limpa o conteúdo atual da tabela

  if (users.length === 0) {
    var row = document.createElement('tr');
    row.innerHTML = '<td colspan="5">Nenhum usuário cadastrado.</td>';
    tableBody.appendChild(row);
  } else {
    users.forEach(function (user) {
      var row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>
          <a href="atualizacao.html?username=${user.username}">
            <i class="far fa-edit"></i>
          </a>
          <a href="#" onclick="deleteUser('${user.username}')">
            <i class="fas fa-trash"></i>
          </a>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
}

// Função para realizar a consulta de usuário com base no username
function searchUserByUsername(username) {
  // Limpa o valor do input de username
  document.getElementById('usernameInput').value = '';

  // Realiza a requisição à API para obter o usuário com o username informado
  fetch(`https://frontend-test.frenet.dev/v1/user/${username}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        return null; // Usuário não encontrado
      } else {
        throw new Error('Erro ao obter dados do usuário.');
      }
    })
    .then(function (data) {
      if (data) {
        fillUserTable([data]);
      } else {
        fillUserTable([]);
        alert('Usuário não encontrado.');
      }
    })
    .catch(function (error) {
      console.error('Erro ao consultar usuário:', error);
    });
}

// Função para excluir um usuário
function deleteUser(username) {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    fetch(`https://frontend-test.frenet.dev/v1/user/${username}`, {
      method: 'DELETE',
    })
      .then(function (response) {
        if (response.ok) {
          alert('Usuário excluído com sucesso!');
          // Recarrega a página atual
          window.location.reload();
        } else {
          throw new Error('Erro ao excluir usuário.');
        }
      })
      .catch(function (error) {
        console.error('Erro ao excluir usuário:', error);
      });
  }
}

// Manipula o evento de envio do formulário de consulta
document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();

  var username = document.getElementById('usernameInput').value.trim();

  // Verifica se o username foi informado
  if (username) {
    searchUserByUsername(username);
  } else {
    alert('Por favor, informe um username válido.');
  }
});
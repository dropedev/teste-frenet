// Função para obter os dados do usuário
function getUserData(username) {
  fetch(`https://frontend-test.frenet.dev/v1/user/${username}`)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao obter dados do usuário.");
      }
    })
    .then(function(userData) {
      updateUserForm(userData);
    })
    .catch(function(error) {
      console.error("Erro ao obter dados do usuário:", error);
    });
}

// Função para atualizar os campos do formulário com os dados do usuário
function updateUserForm(user) {
  document.getElementById("usernameInput").value = user.username;
  document.getElementById("firstNameInput").value = user.firstName;
  document.getElementById("lastNameInput").value = user.lastName;
  document.getElementById("emailInput").value = user.email;
  document.getElementById("phoneInput").value = user.phone;
  document.getElementById("passwordInput").value = user.password;
  document.getElementById("userStatusInput").value = user.userStatus;
}

// Função para atualizar o usuário
function updateUser(username, userData) {
  fetch(`https://frontend-test.frenet.dev/v1/user/${username}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(function(response) {
      if (response.ok) {
        alert("Usuário atualizado com sucesso!");

         // Redireciona para a página de consulta
         window.location.href = "consulta.html";
      } else {
        response.json().then(function(errorData) {
          var errorMessage = errorData.message || "Erro ao atualizar usuário.";
          alert(errorMessage);
        });
      }
    })
    .catch(function(error) {
      console.error("Erro ao atualizar usuário:", error);
    });
}

// Captura o parâmetro "username" da URL
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

// Verifica se o username foi informado na URL
if (username) {
  // Preenche o campo "username" no formulário com o valor capturado
  document.getElementById('usernameInput').value = username;

  // Obtém os dados do usuário e preenche os campos do formulário
  getUserData(username);

  // Manipula o evento de envio do formulário de atualização
  document.getElementById("updateForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var userData = {
      username: document.getElementById("usernameInput").value.trim(),
      firstName: document.getElementById("firstNameInput").value.trim(),
      lastName: document.getElementById("lastNameInput").value.trim(),
      email: document.getElementById("emailInput").value.trim(),
      phone: document.getElementById("phoneInput").value.trim(),
      password: document.getElementById("passwordInput").value.trim(),
      userStatus: document.getElementById("userStatusInput").value.trim()
    };

    updateUser(username, userData);
  });
} else {
  alert("Por favor, informe um username válido na URL.");
}
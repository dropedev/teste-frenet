// Função para atualizar os campos do formulário com os dados do usuário
function updateUserForm(user) {
  document.getElementById("usernameInput").value = user.username;
  document.getElementById("firstNameInput").value = user.firstName;
  document.getElementById("lastNameInput").value = user.lastName;
  document.getElementById("emailInput").value = user.email;
  document.getElementById("phoneInput").value = user.phone;
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
      } else {
        alert("Erro ao atualizar usuário.");
      }
    })
    .catch(function(error) {
      console.error("Erro ao atualizar usuário:", error);
    });
}

// Manipula o evento de envio do formulário de atualização
document.getElementById("updateForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var username = document.getElementById("usernameInput").value.trim();

  // Verifica se o username foi informado
  if (username) {
    var userData = {
      firstName: document.getElementById("firstNameInput").value.trim(),
      lastName: document.getElementById("lastNameInput").value.trim(),
      email: document.getElementById("emailInput").value.trim(),
      phone: document.getElementById("phoneInput").value.trim()
    };

    updateUser(username, userData);
  } else {
    alert("Por favor, informe um username válido.");
  }
});
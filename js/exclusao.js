  // Função para excluir um usuário
  function deleteUser(username) {
    fetch(`https://frontend-test.frenet.dev/v1/user/${username}`, {
      method: "DELETE"
    })
      .then(function(response) {
        if (response.ok) {
          alert("Usuário excluído com sucesso!");
        } else {
          alert("Erro ao excluir usuário.");
        }
      })
      .catch(function(error) {
        console.error("Erro ao excluir usuário:", error);
      });
  }

  // Manipula o evento de envio do formulário de exclusão
  document.getElementById("deleteForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("usernameInput").value.trim();

    // Verifica se o username foi informado
    if (username) {
      var confirmDelete = confirm("Tem certeza que deseja excluir o usuário?");
      if (confirmDelete) {
        deleteUser(username);
      }
    } else {
      alert("Por favor, informe um username válido.");
    }
  });
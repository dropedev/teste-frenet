// Função para lidar com o envio do formulário
function handleSubmit(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  // Obtém os valores dos campos de entrada
  const username = document.getElementById('username').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value;

  // Cria um objeto com os dados do usuário
  const userData = {
    id: 0, // O ID será gerado automaticamente pelo servidor (autonumber)
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    phone: phone,
    userStatus: 2 // Valor padrão
  };

  // Envia a requisição POST para a API
  fetch('https://frontend-test.frenet.dev/v1/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Usuário cadastrado com sucesso:', data);

      // Exibe a mensagem de sucesso
      alert('Usuário cadastrado com sucesso!');

      // Limpa os valores dos campos de entrada
      document.getElementById('username').value = '';
      document.getElementById('firstName').value = '';
      document.getElementById('lastName').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      document.getElementById('phone').value = '';
    })
    .catch(error => {
      console.error('Erro ao cadastrar usuário:', error);
      // Lógica adicional aqui, como exibir uma mensagem de erro
    });
}

// Adiciona um event listener para o evento de submit do formulário
const form = document.getElementById('cadastroForm');
form.addEventListener('submit', handleSubmit);
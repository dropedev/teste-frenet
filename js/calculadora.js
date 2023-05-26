// Função para calcular o frete
function calculateFreight(freightData) {
  fetch("https://frontend-test.frenet.dev/v1/quote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(freightData)
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao calcular frete.");
      }
    })
    .then(function(data) {
      // Limpa os resultados anteriores
      document.getElementById("resultList").innerHTML = "";

      // Verifica se há cotações disponíveis
      if (data.quotations.length > 0) {
        // Exibe os resultados das cotações
        data.quotations.forEach(function(quotation) {
          var resultItem = document.createElement("div");
          resultItem.classList.add("alert", "alert-info");
          if (quotation.shippingCompetitorPrice !== null) {
            resultItem.textContent = `Transportadora: ${quotation.carrier} | Valor: R$ ${quotation.shippingCompetitorPrice.toFixed(2)}`;
          } else {
            resultItem.textContent = `Transportadora: ${quotation.carrier} | Valor: Preço indisponível`;
          }

          document.getElementById("resultList").appendChild(resultItem);
        });
      } else {
        // Exibe mensagem de nenhuma cotação encontrada
        var resultItem = document.createElement("div");
        resultItem.classList.add("alert", "alert-warning");
        resultItem.textContent = "Nenhuma cotação encontrada.";

        document.getElementById("resultList").appendChild(resultItem);
      }

      // Exibe o container de resultados
      document.getElementById("resultContainer").style.display = "block";
    })
    .catch(function(error) {
      console.error("Erro ao calcular frete:", error);
      alert("Erro ao calcular frete. Por favor, tente novamente.");
    });
}

// Manipula o evento de envio do formulário de cálculo de frete
document.getElementById("freightForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var zipCodeSource = document.getElementById("zipCodeSourceInput").value.trim();
  var zipCodeDestination = document.getElementById("zipCodeDestinationInput").value.trim();
  var weight = parseInt(document.getElementById("weightInput").value.trim());
  var width = parseInt(document.getElementById("widthInput").value.trim());
  var height = parseInt(document.getElementById("heightInput").value.trim());
  var length = parseInt(document.getElementById("lengthInput").value.trim());

  // Verifica se todos os campos foram preenchidos
  if (zipCodeSource && zipCodeDestination && weight && width && height && length) {
    var freightData = {
      zipCodeSource: zipCodeSource,
      zipCodeDestination: zipCodeDestination,
      weight: weight,
      dimension: {
        width: width,
        heigth: height,
        length: length
      }
    };

    calculateFreight(freightData);
  } else {
    alert("Por favor, preencha todos os campos corretamente.");
  }
});
  // Função para calcular o frete
  function calculateFreight(freightData) {
    fetch("https://frontend-test.frenet.dev/v1/freight", {
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

        // Exibe os resultados
        data.forEach(function(result) {
          var resultItem = document.createElement("div");
          resultItem.classList.add("alert", "alert-info");
          resultItem.textContent = `Transportadora: ${result.companyName} | Valor: R$ ${result.shippingPrice}`;

          document.getElementById("resultList").appendChild(resultItem);
        });

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
          height: height,
          length: length
        }
      };

      calculateFreight(freightData);
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  });
function populateUF() {
  const ufSelect = document.querySelector("select[name=uf]")
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(function (res) { return res.json() })
    .then(states => {

      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    }
    )
}

populateUF()

function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  const ufvalue = event.target.value

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

  const indexOfSelectedUf = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedUf].text

  fetch(url)
    .then(function (res) { return res.json() })
    .then(cities => {

      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
      }
      citySelect.disabled = false
    }
    )
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)
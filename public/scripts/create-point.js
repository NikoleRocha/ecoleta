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

//Itens de coleta
const itensToCollect = document.querySelectorAll(".itens-grid li")

for (let item of itensToCollect) {
  item.addEventListener("click", handleSelecteditem)
}

let selectedItems = []
const collectedItems = document.querySelector("input[name=items]")

function handleSelecteditem(event) {
  const itemLi = event.target
  itemLi.classList.toggle("selected")
  const itemId = event.target.dataset.id

  const alreadySelected = selectedItems.findIndex(item => {
    return item == itemId
  })

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item => {
      return item != itemId
    })
    selectedItems = filteredItems
  } else {
    selectedItems.push(itemId)
  }

  collectedItems.value = selectedItems
}
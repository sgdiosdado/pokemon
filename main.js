const searchBar = document.getElementById('search-bar')
const btnSearch = document.getElementById('search')
const url = 'http://localhost:3000/api/pokemon'
const grid = document.getElementById('grid')
const field = document.getElementById('field')
const alertBar = document.getElementById('alert')

const createCard = (id, name, weight, height, exp, types, image) => {
  const card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
    <div class="card-header">
      Pokedex: ${id}
    </div>
    <img src="${image}" class="card-img-top" alt="${name}">
    <div class="card-body">
      <h2 class="card-title text-capitalize">${name}</h2>
      <p class="card-text s-mb-0">Stats:</p>
      <ul title="Stats" class="s-pl-3 s-pt-1">
        <li>Weight: ${weight}</li>
        <li>Height: ${height}</li>
        <li>Base experience: ${exp}</li>
      </ul>
    </div>
    <div class="card-footer">
      <small class="text-muted text-capitalize">
        <span class="font-weight-bold">Types: </span>${types.join(', ')}
      </small>
    </div>`;
  
  return card
}

const addInputError = _ => {
  searchBar.classList.add('border-danger')
  field.classList.add('field')
}

const removeInputError = (_) => {
  searchBar.classList.remove('border-danger')
  field.classList.remove('field')
}

const addAlert = (message) => {
  alertBar.classList.remove('hide')
  alertBar.textContent = message
}

const removeAlert = (_) => {
  alertBar.classList.add('hide')
};

btnSearch.addEventListener('click', () => {
  if(!searchBar.value) {
    addInputError()
    return
  } else {
    removeInputError()
  }
  fetch(`${url}/${searchBar.value}`)
    .then(res => res.json())
    .then(data => {
      if (data.status == 200) {
        removeAlert()
        const card = createCard(
          data.data.id,
          data.data.name,
          data.data.weight,
          data.data.height,
          data.data.base_experience,
          data.data.types,
          data.data.image
        )
        grid.appendChild(card)
      } else {
        addAlert(data.message)
      }
    })
    searchBar.value = ''
})
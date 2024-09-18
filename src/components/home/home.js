import fetchApi from '../../utils/fetch'
import printImages from '../../utils/printImages'
import { createButton } from '../button/button'
import './home.css'

export let searchQuery = ''
export let page = ''
const main = document.querySelector('#main')
const divResults = document.createElement('section')
export default async function home(parentNode) {
  divResults.classList.add('gridContainer', 'divResults')
  parentNode.append(divResults)
  const response = await fetchApi()
  const photos = response.results

  printImages(photos)

  const divCargarMas = document.createElement('div')
  divCargarMas.classList.add('flexContainer', 'divCargarMas')
  const cargarMasBtn = createButton(
    'cargarBtn',
    'Cargar más',
    'primaryButton',
    divCargarMas
  )
  cargarMasBtn.addEventListener('click', async () => {
    const searcher = document.querySelector('#searcher')
    let wordUsed = searcher.value.trim() || searchQuery || 'paisaje'
    searchQuery = wordUsed
    page++
    const response = await fetchApi(searchQuery, page)
    const nextPage = response.results
    printImages(nextPage)
  })
  parentNode.append(divResults, divCargarMas)
}

export const searchResults = async (word) => {
  searchQuery = word
  const existingDivError = document.querySelector('.divError')
  if (existingDivError) {
    existingDivError.remove()
  }
  if (searchQuery) {
    const response = await fetchApi(searchQuery, page)
    const photos = response.results
    console.log(photos)

    if (photos.length === 0) {
      const divError = document.createElement('div')
      divError.classList.add('divError', 'flexContainer')
      divError.innerHTML = `<h3>No se ha encontrado su término de búsqueda. Pruebe con otro.</h3>`
      main.insertBefore(divError, divResults)
      searchQuery = 'gato'
      const defaultRes = await fetchApi(searchQuery, page)
      const errorPhotos = defaultRes.results
      printImages(errorPhotos)
      searcher.value = ''
    } else {
      printImages(photos)
      searcher.value = ''
    }
  }
}

const footer = document.querySelector('footer')
const textFooter = document.createElement('p')
footer.classList.add('flexContainer')
textFooter.textContent = 'Copyright @ARF2024'
textFooter.classList.add('textFooter')

footer.append(textFooter)

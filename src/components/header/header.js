import './header.css'
import { createButton } from '../button/button.js'
import printImages from '../../utils/printImages.js'
import fetchApi from '../../utils/fetch.js'
import { searchResults } from '../home/home.js'

const main = document.querySelector('#main')

export default function getHeader(parentNode) {
  const header = document.querySelector('header')
  header.classList.add('flexContainer')

  const logo = document.createElement('img')
  logo.src = './src/components/header/header_assets/icono_pinterest.png'
  logo.classList.add('logo')
  logo.alt = 'logo Pinterest'
  logo.addEventListener('click', async (e) => {
    const existingDivError = document.querySelector('.divError')
    if (existingDivError) {
      existingDivError.remove()
    }
    const response = await fetchApi()
    const photos = response.results
    printImages(photos)
  })
  const divButtons = document.createElement('div')
  divButtons.classList.add('flexContainer', 'divButtons')
  createButton('inicioBtn', 'Inicio', 'secondaryButton', divButtons)
  createButton('explorarBtn', 'Explorar', 'terciaryButton', divButtons)
  createButton('crearBtn', 'Crear', 'terciaryButton', divButtons)

  const searcher = document.createElement('input')
  searcher.id = 'searcher'
  searcher.placeholder = '🔎 Buscar'
  searcher.classList.add('searcher')
  searcher.addEventListener('keydown', (e) => {
    let word = e.target.value.trim()
    if (e.key === 'Enter') {
      searchResults(word)
    }
  })

  const divProfile = document.createElement('div')
  divProfile.id = 'divProfile'
  divProfile.classList.add('flexContainer')

  const iconNotifications = document.createElement('img')
  iconNotifications.src =
    './src/components/header/header_assets/icon _bell_.svg'
  iconNotifications.classList.add('iconNotifications')
  const iconCommentary = document.createElement('img')
  iconCommentary.src =
    './src/components/header/header_assets/icon _Comment Dots_.svg'
  iconCommentary.classList.add('iconCommentary')
  const iconLog = document.createElement('div')
  iconLog.textContent = 'D'
  iconLog.classList.add('iconLog', 'flexContainer')

  parentNode.append(logo, divButtons, searcher, divProfile)
  divProfile.append(iconNotifications, iconCommentary, iconLog)
}

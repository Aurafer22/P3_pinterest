import './style.css'
import getHeader from './src/components/header/header.js'
import home from './src/components/home/home.js'

const headerPlace = document.querySelector('#header')
const main = document.querySelector('#main')
getHeader(headerPlace)
home(main)

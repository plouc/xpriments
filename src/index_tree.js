import './styles/main.css'
import months    from './months'
import landscape from './landscape'

const canvas = document.createElement('canvas')
const ctx    = canvas.getContext('2d')

const width  = canvas.width  = window.innerWidth
const height = canvas.height = window.innerHeight

document.getElementById('app').appendChild(canvas)

const month = months[0]

landscape(width, height, ctx, month)

import './styles/main.css'
import _ from 'lodash'
import * as d3 from 'd3'

const canvas = document.createElement('canvas')
const ctx    = canvas.getContext('2d')

const width  = canvas.width  = window.innerWidth
const height = canvas.height = window.innerHeight

document.getElementById('app').appendChild(canvas)

const attractors = {
    dejong: {
        // xn+1 = sin(a yn) - cos(b xn)
        x: (x, y, { a, b }) =>  Math.sin(a * y) - Math.cos(b * x),
        // yn+1 = sin(c xn) - cos(d yn)
        y: (x, y, { c, d }) =>  Math.sin(c * x) + Math.cos(d * y),
    },
    clifford: {
        // xn+1 = sin(a yn) + c cos(a xn)
        x: (x, y, { a, c }) => Math.sin(a * y) + c * Math.cos(a * x),
        // yn+1 = sin(b xn) + d cos(b yn)
        y: (x, y, { b, d }) => Math.sin(b * x) + d * Math.cos(b * y),
    },
}

const randConstant  = () => Math.random() * 6 - 3
const randConstants = () => ({
    a: randConstant(),
    b: randConstant(),
    c: randConstant(),
    d: randConstant(),
})

const colors    = [
    '#57d6ba',
    '#ff8814',
    '#e283c4',
    '#71add4',
    '#ff4823',
    '#ffee00',
    '#ff2c5f',
]
const randColor = () => _.last(_.shuffle(colors))


const SCALE     = 200
const attractor = attractors.dejong

let constants = randConstants()
let constantsInterpolation

let color = d3.color(randColor())
let colorInterpolation

let interpolationT = 1

const randomize = () => {
    constantsInterpolation = d3.interpolateObject({ ...constants }, randConstants())
    colorInterpolation     = d3.interpolateRgb(color, randColor())
    interpolationT         = 0
}

canvas.addEventListener('click', randomize)

ctx.fillStyle = '#000000'
ctx.fillRect(0, 0, width, height)
ctx.fillStyle = 'rgba(0, 0, 0, .06)'

const loop = () => {
    requestAnimationFrame(loop)

    let x = Math.random() * width
    let y = Math.random() * height

    if (interpolationT < 1) {
        constants = constantsInterpolation(interpolationT)
        color     = d3.rgb(colorInterpolation(interpolationT))
    }

    const { r: red, g: green, b: blue } = color

    if (interpolationT >= .99 && interpolationT < 1) {
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, width, height)
        ctx.fillStyle = 'rgba(0, 0, 0, .06)'
    } else {
        ctx.fillRect(0, 0, width, height)
    }

    const canvasData = ctx.getImageData(0, 0, width, height)
    for (let i = 0; i < 100000; i++) {
        const dx = Math.round(x * SCALE + width  * .5)
        const dy = Math.round(y * SCALE + height * .5)

        const index = (dx + dy * width) * 4

        canvasData.data[index]     = red
        canvasData.data[index + 1] = green
        canvasData.data[index + 2] = blue
        canvasData.data[index + 3] = 255

        const x1 = attractor.x(x, y, constants)
        const y1 = attractor.y(x, y, constants)

        x = x1
        y = y1
    }
    ctx.putImageData(canvasData, 0, 0)

    interpolationT += .01
}

loop()
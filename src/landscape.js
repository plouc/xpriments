import * as d3                    from 'd3'
import { LSystem, renderLSystem } from './lib/lSystem'

const drawBackground = (width, height, ctx, config) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    config.background.forEach(({ position, color }) => {
        gradient.addColorStop(position, color)
    })
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
}

const drawGround = (width, height, ctx, config) => {
    const points = [...Array(config.ground.resolution).keys()].map(() => ([
        Math.random() * width * 1.2 - width * .1,
        height * .66 + Math.random() * height * .44,
    ]))
    const voronoi = d3.voronoi().extent([[0, 0], [width, height]])
    const diagram = voronoi(points)

    diagram.triangles().forEach(trianglePoints => {
        ctx.beginPath()
        ctx.fillStyle = config.ground.color()
        ctx.lineWidth = .5

        trianglePoints.forEach((p, i) => {
            if (i === 0) return ctx.moveTo(p[0], p[1])
            ctx.lineTo(p[0], p[1])
            if (i === 2) {
                ctx.lineTo(trianglePoints[0][0], trianglePoints[0][1])
            }
        })
        ctx.fill()
    })
}

const drawSun = (width, height, ctx, config) => {
    /*
    const turns      = 3
    const resolution = 36
    const radius     = 120
    const points     = []

    const gen =     [...Array(resolution + 1).keys()]

    const TAU = Math.PI * 2
    const angle = TAU / resolution

    gen.forEach(i => {
        const a = i * angle

        points.push({
            x: Math.cos(a) * radius,
            y: Math.sin(a) * radius,
        })
    })

    ctx.beginPath()
    ctx.strokeStyle = '#f2e4d9'
    ctx.lineWidth = 3
    points.forEach((p, i) => {
        return
        if (i === 0) {
            ctx.moveTo(p.x + width * .72, p.y + height * .25)
        }
        ctx.lineTo(p.x + width * .72, p.y + height * .25)
    })
    ctx.stroke()
    */
}

const drawTree = (width, height, ctx, config) => {
    const setup     = config.tree.config(width, height)
    const structure = LSystem(setup.gen)
    const parts     = renderLSystem(structure, setup)
    const maxDepth  = d3.max(parts, p => p.depth)

    parts.forEach(part => {
        ctx.beginPath()
        ctx.strokeStyle = config.tree.color(part)
        ctx.lineWidth   = (maxDepth - part.depth) / maxDepth * setup.maxWidth
        ctx.lineCap     = 'round'
        ctx.moveTo(part.origin.x, part.origin.y)
        ctx.lineTo(part.target.x, part.target.y)
        ctx.stroke()
    })
}

export default function landscape(width, height, ctx, config) {
    drawBackground(width, height, ctx, config)
    drawGround(width, height, ctx, config)
    drawSun(width, height, ctx, config)
    drawTree(width, height, ctx, config)
}
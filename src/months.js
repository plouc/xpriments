import * as d3     from 'd3'
import treeConfigs from './tree_configs'

const january = () => {
    const triColor = d3.interpolateRgb('#ecbfb9', '#a8bbc9')

    return {
        background: [
            { position: 0,   color: '#ecc5b6' },
            { position: .66, color: '#a8bbc9' },
        ],
        ground: {
            resolution: 120,
            color:      () => triColor(Math.random()),
        },
        tree: {
            config: treeConfigs.b,
            color:  branch => '#8d9eac',
        },
    }
}

const autumn = () => {
    const triColor  = d3.interpolateRgb('#e19337', '#4d1705')
    const treeColor = d3.interpolateRgb('#cb1800', '#3c1603')

    return {
        background: [
            { position: 0,   color: '#f9cf4c' },
            { position: .66, color: '#e19337' },
        ],
        ground: {
            resolution: 260,
            color:      () => triColor(Math.random()),
        },
        tree: {
            config: treeConfigs.c,
            color:  branch => treeColor(Math.random()),
        },
    }
}

const winter = () => {
    const triColor  = d3.interpolateRgb('#ffffff', '#00b0f7')
    const treeColor = d3.interpolateRgb('#ffffff', '#00b0f7')

    return {
        background: [
            { position: 0,   color: '#00b0f7' },
            { position: .66, color: '#ffffff' },
        ],
        ground: {
            resolution: 1200,
            color:      () => triColor(Math.random()),
        },
        tree: {
            config: treeConfigs.b,
            color:  branch => treeColor(Math.random()),
        },
    }
}

const spring = () => {
    const triColor  = d3.interpolateRgb('#a4996c', '#78bd99')

    return {
        background: [
            { position: 0,   color: '#78bd99' },
            { position: .66, color: '#8ed6ba' },
        ],
        ground: {
            resolution: 64,
            color:      () => triColor(Math.random()),
        },
        tree: {
            config: treeConfigs.b,
            color:  branch => '#a4996c',
        },
    }
}

export default [
    january(),
    autumn(),
    winter(),
    spring(),
]
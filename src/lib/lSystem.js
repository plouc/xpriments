import Vec2D from 'victor'

export const LSystem = ({
    axiom,
    rules,
    iterations = 1,
}) => {
    const boundRules = {}
    for (let symbol in rules) {
        const rule = rules[symbol]

        if (typeof rule === 'string') {
            boundRules[symbol] = () => rule
        } else {
            const totalWeight = rule.reduce((acc, r) => acc + r.weight, 0)
            if (totalWeight !== 1) {
                throw new Error([
                    `Invalid rules for symbol '${symbol}',`,
                    `total weight must be '1', found '${totalWeight}'`,
                ].join(' '))
            }

            const subRules = []
            rule.reduce((currentWeight, { weight, rule: replace }) => {
                subRules.push({
                    predicate: rand => (rand >= currentWeight && rand < currentWeight + weight),
                    replace,
                })

                return currentWeight + weight
            }, 0)

            boundRules[symbol] = () => {
                const rand = Math.random()
                return subRules.find(({ predicate }) => predicate(rand)).replace
            }
        }
    }

    const rewrite = c => boundRules[c] ? boundRules[c]() : c

    return [...Array(iterations).keys()].reduce(acc => acc.split('').map(rewrite).join(''), axiom)
}

const INSTRUCTION_MOVE       = 'F' // draw forward
const INSTRUCTION_TURN_LEFT  = '+' // turn left
const INSTRUCTION_TURN_RIGHT = '-' // turn right
const INSTRUCTION_SAVE       = '[' // save current position
const INSTRUCTION_RESTORE    = ']' // restore last saved position

export const renderLSystem = (structure, setup) => {
    const positions   = [setup.origin]
    const angles      = [Math.PI * -.5]
    const depths      = [0]

    let currentOrigin = positions[0]
    let currentAngle  = angles[0]
    let currentDepth  = depths[0]
    let current       = null

    const parts       = []

    structure.split('').forEach(instruction => {
        switch (instruction) {
            case INSTRUCTION_TURN_LEFT:
                currentAngle -= setup.angle()
                break

            case INSTRUCTION_TURN_RIGHT:
                currentAngle += setup.angle()
                break

            case INSTRUCTION_SAVE:
                positions.push(currentOrigin)
                angles.push(currentAngle)
                depths.push(currentDepth)
                break

            case INSTRUCTION_RESTORE:
                currentOrigin = positions.pop()
                currentAngle  = angles.pop()
                currentDepth  = depths.pop()
                break

            case INSTRUCTION_MOVE:
                const origin = currentOrigin
                const target = new Vec2D(setup.len, 0)
                target.rotate(currentAngle)
                target.add(origin)

                const part = {
                    origin,
                    target,
                    depth: currentDepth,
                }

                current = part

                currentOrigin = part.target
                currentDepth++

                parts.push(part)

                break
        }
    })

    return parts
}

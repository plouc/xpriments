import Vec2D from 'victor'

export default {
    a: (width, height) => ({
        len:      1.6,
        maxWidth: 8,
        angle:    () => Math.PI * (.2 - Math.random() * .2),
        origin:   new Vec2D(width * .5, height * .95),
        gen:      {
            axiom:      'X',
            iterations: 8,
            rules:      {
                'X': 'F[-X]F[+X]-X',
                'F': 'FF',
            },
        },
    }),
    b: (width, height) => ({
        len:      6,
        maxWidth: 1,
        angle:    () => Math.PI * (.1 + Math.random() * .1),
        origin:   new Vec2D(width * .33, height * .66),
        gen:      {
            axiom:      'F',
            iterations: 5,
            rules:      {
                'F': 'FF+[+F-F-F]-[-F+F+F]',
            },
        },
    }),
    c: (width, height) => ({
        len:      2,
        maxWidth: 6,
        angle:    () => Math.PI * (.1 + Math.random() * .2),
        origin:   new Vec2D(width * .33, height * .66),
        gen:      {
            axiom:      'X',
            iterations: 7,
            rules:      {
                'X': 'F+[[X]-X]-F[-FX]+X',
                'F': 'FF',
            },
        },
    }),
    d: (width, height) => ({
        len:      1.6,
        maxWidth: 12,
        angle:    () => Math.PI * (.1 + Math.random() * .2),
        origin:   new Vec2D(width * .5, height * .95),
        gen:      {
            axiom:      'X',
            iterations: 8,
            rules:      {
                'X': 'F[+X][-X]FX',
                'F': 'FF',
            },
        },
    }),
    e: (width, height) => ({
        len:      4,
        maxWidth: 8,
        angle:    () => Math.PI * (.3 - Math.random() * .3),
        origin:   new Vec2D(width * .5, height * .95),
        gen:      {
            axiom:      'X',
            iterations: 6,
            rules:      {
                'X': [
                    { weight: .33, rule: 'F[+X][-X]FX'        },
                    { weight: .33, rule: 'F-[[X]+X]+F[+FX]-X' },
                    { weight: .34, rule: 'F[+X]F[−X]+X'       },
                ],
                'F': 'FF',
            },
        },
    }),
    f: (width, height) => ({
        len:      5,
        maxWidth: 5,
        angle:    () => Math.PI * (.15 + Math.random() * .15),
        origin:   new Vec2D(width * .66, height * .66),
        gen:      {
            axiom:      'F',
            iterations: 5,
            rules:      {
                'F': [
                    { weight: .33, rule: 'FF[+F][-F]FF'         },
                    { weight: .33, rule: 'FFF-[+F]+F[-F]-F'     },
                    { weight: .34, rule: 'FF+[+F-F-F]-[-F+F+F]' },
                ],
            },
        },
    }),
}

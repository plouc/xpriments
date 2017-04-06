import React, { Component } from 'react'
import ConfigEditor         from './ConfigEditor'

export default class App extends Component {
    render() {
        return (
            <div>
                <ConfigEditor
                    onSubmit={values => { console.log(JSON.stringify(values, null, '  ')) }}
                    initialValues={{
                        ground: {
                            resolution: 200,
                            colors:     [
                                '#FF0000',
                                '#0000FF',
                            ],
                        },
                        trees: {
                            lsystem: {
                                axiom:      'F',
                                iterations: 1,
                            },
                        },
                    }}
                />
            </div>
        )
    }
}

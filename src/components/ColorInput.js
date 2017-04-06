import React, { Component } from 'react'
import { SketchPicker }     from 'react-color'

export default class ColorInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayColorPicker: false,
            color: {
                r: 241,
                g: 112,
                b: 19,
                a: 0,
            },
        }
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    }

    handleChange = color => {
        this.setState({ color: color.rgb })
    }

    render() {
        const { r, g, b, a } = this.state.color

        return (
            <div>
                <div onClick={this.handleClick}>
                    <div
                        style={{
                            color: `rgba(${r}, ${g}, ${b}, ${a})`,
                        }}
                    />
                </div>
                {this.state.displayColorPicker && (
                    <div>
                        <div onClick={this.handleClose}/>
                        <SketchPicker
                            color={this.state.color}
                            onChange={this.handleChange}
                        />
                    </div>
                )}
            </div>
        )
    }
}
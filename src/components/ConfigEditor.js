import '../styles/ConfigEditor.css'
import React, { Component } from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import Slider from 'rc-slider'
import ColorInput from './ColorInput'

const CustomSlider = ({ input, meta, ...others }) => {
    return (
        <Slider
            value={Number(input.value)}
            onChange={input.onChange}
            {...others}
        />
    )
}

const renderGradientStops = ({ fields, meta: { touched, error } }) => (
    <div className="ConfigEditor__sub">
        <div className="ConfigEditor__row ConfigEditor__group">
            <button type="button" onClick={() => fields.push({})}>Add color stop</button>
        </div>
        {fields.map((stop, index) =>
            <div key={index} className="ConfigEditor__group ConfigEditor__row ConfigEditor__row--double">
                <label>pos</label>
                <Field
                    name={`${stop}.position`}
                    component="input"
                    type="number"
                    min={0}
                    max={1}
                    step={.01}
                />
                <label>color</label>
                <Field
                    name={`${stop}.color`}
                    component="input"
                    type="color"
                />
            </div>
        )}
    </div>
)

const renderColors = ({ fields, meta: { touched, error } }) => (
    <div className="ConfigEditor__sub">
        <div className="ConfigEditor__row ConfigEditor__group">
            <button type="button" onClick={() => fields.push({})}>Add color</button>
        </div>
        {fields.map((color, index) =>
            <div key={index} className="ConfigEditor__group ConfigEditor__row">
                <label>color</label>
                <Field
                    name={`${color}.color`}
                    component={ColorInput}
                    type="number"
                    min={0}
                    max={1}
                    step={.01}
                />
            </div>
        )}
    </div>
)

class ConfigEditor extends Component {
    render() {
        const { handleSubmit } = this.props

        return (
            <form className="ConfigEditor" onSubmit={handleSubmit}>
                <h2>Editor <span onClick={handleSubmit}>ok</span></h2>
                <div className="ConfigEditor__section">
                    <h3 className="ConfigEditor__section__title">background</h3>
                    <div className="ConfigEditor__row">
                        <label>type</label>
                        <Field name="background.type" component="select">
                            <option value="plain">plain</option>
                            <option value="gradient">gradient</option>
                        </Field>
                    </div>
                    <FieldArray
                        name="background.gradientStops"
                        component={renderGradientStops}
                    />
                </div>
                <div className="ConfigEditor__section">
                    <h3 className="ConfigEditor__section__title">ground</h3>
                    <div className="ConfigEditor__sub">
                        <div className="ConfigEditor__row">
                            <label>resolution</label>
                            <Field
                                name="ground.resolution"
                                component="input"
                                type="number"
                                step={1}
                                min={36}
                                max={1200}
                            />
                            <Field
                                name="ground.resolution"
                                component={CustomSlider}
                                step={1}
                                min={36}
                                max={1200}
                            />
                        </div>
                        <FieldArray
                            name="ground.colors"
                            component={renderColors}
                        />
                    </div>
                </div>
                <div className="ConfigEditor__section">
                    <h3 className="ConfigEditor__section__title">trees</h3>
                    <div className="ConfigEditor__sub">
                        <div className="ConfigEditor__row">
                            <label>color</label>
                            <Field
                                name="trees.lsystem.color"
                                component="input"
                                type="text"
                            />
                        </div>
                        <h3 className="ConfigEditor__section__title">l-system</h3>
                        <div className="ConfigEditor__sub">
                            <div className="ConfigEditor__row">
                                <label>axiom</label>
                                <Field
                                    name="trees.lsystem.axiom"
                                    component="input"
                                    type="text"
                                />
                            </div>
                            <div className="ConfigEditor__row">
                                <label>iterations</label>
                                <Field
                                    name="trees.lsystem.iterations"
                                    component="input"
                                    type="number"
                                    step={1}
                                    min={1}
                                    max={12}
                                />
                                <Field
                                    name="trees.lsystem.iterations"
                                    component={CustomSlider}
                                    step={1}
                                    min={1}
                                    max={12}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'config',
})(ConfigEditor)
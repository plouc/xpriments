import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import config              from './configReducer'

export default combineReducers({
    form,
    config,
})

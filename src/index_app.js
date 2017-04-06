import 'rc-slider/assets/index.css'
import './styles/main.css'

import React                from 'react'
import ReactDOM             from 'react-dom'
import { Provider }         from 'react-redux'
import configureStore       from './store/configureStore'
import App                  from './containers/AppContainer'

const store = configureStore()

ReactDOM.render(
    (
        <Provider store={store}>
            <App/>
        </Provider>
    ),
    document.getElementById('app')
)

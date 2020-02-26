import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './router/AppRouter'
import Navbar from './includes/Navbar'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../store'

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <AppRouter />
            </div>
        )
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('app')
    );
}

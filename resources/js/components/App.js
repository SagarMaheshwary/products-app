import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './router/AppRouter'
import Navbar from './includes/Navbar'
import { BrowserRouter } from 'react-router-dom'

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
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('app')
    );
}

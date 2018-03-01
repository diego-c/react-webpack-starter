import React, { Component } from 'react';
import asyncComponent from '../asyncComponent/AsyncComponent';

// use this to split the Image component into a new chunk
// instead of: import Image from '../Image/Image';
const Image = asyncComponent(() => (
    import('../Image/Image').then(module => module.default)
));

import classes from './App.css';
import logo from '../../img/react-logo.png';

export default class App extends Component {
    state = {
        project: 'App'
    }

    render() {
        return (
            <div className = { classes.App }>
                <Image path = { logo } />

                <h1>Welcome to the { this.state.project } project!</h1>
                <h2>Edit ./src/components/App/App.js to get started.</h2>
            </div>
        )
    }
}
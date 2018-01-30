import React, { Component } from 'react';
import Image from '../Image/Image';
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
import React, { Component } from 'react';
import classes from './App.css';

export default class App extends Component {
    state = {
        project: 'App'
    }

    render() {
        return (
            <div className = { classes.App }>
                <h1>Welcome to the { this.state.project } project!</h1>
                <h2>Edit ./src/components/App/App.js to get started.</h2>
            </div>
        )
    }
}
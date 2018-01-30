import React, { Component } from 'react';

export default class App extends Component {
    state = {
        project: 'App'
    }

    render() {
        return (
            <div>
                <h1>Welcome to the { this.state.project } project!</h1>
                <h2>Edit ./src/components/App/App.js to get started.</h2>
            </div>
        )
    }
}
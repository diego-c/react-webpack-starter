import React, { Component } from 'react';

export default class App extends Component {
    state = {
        project: 'App'
    }

    render() {
        return (
            <h1>Welcome to the { this.state.project } project!</h1>
        )
    }
}
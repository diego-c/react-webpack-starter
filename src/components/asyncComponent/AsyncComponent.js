import React, { Component } from 'react';

const asyncComponent = getComponent => (

    class extends Component {

        state = {
            Comp: null
        }

        componentWillMount() {
            if (!this.state.comp) {
                getComponent().then(Comp => {
                    this.setState({ Comp });   
                });
            }
        }

        render() {
            const { Comp } = this.state;

            return Comp ? <Comp { ...this.props } /> : null 
        }
    }
)

export default asyncComponent;
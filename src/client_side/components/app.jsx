import React, { Component } from 'react';

export class Hello extends Component {
    render() {
        return <h2 > Hi { this.props.user }, { this.props.welcome } < /h2>;
    }
}
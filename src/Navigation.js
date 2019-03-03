import React, { Component } from 'react'

const parentStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '2%',
    padding: '10px'
}
export default class Navigation  extends Component {
    render() {
        return (
            <div style={parentStyle}>
            <div>
            <a href="#lb">Leaderboard</a>
            </div>
            <div>
            <a href="#tribes">Tribes</a>
            </div>
            <div>
            <a href="#rules">Rules</a>
            </div>
            </div>
        )
    }
}

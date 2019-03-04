import React, { Component } from 'react'
import logo from './survivor-logo.png'

const imageStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '300px',
    width: '50%',
    paddingTop: '10px'
}

class Header extends Component {
    render() {
        return (
            <div>
                <img alt='Survivor Logo' src={logo} style={imageStyle} />
            </div>
        )
    }
}

export default Header

import React from 'react'

class Eliminated extends React.Component {
    render() {
        const makeElimNames = castaways => {
            let nameArray = []
            if (castaways) {
                castaways.forEach(castaway => {
                    if (castaway.eliminated === 'TRUE') {
                        let name = castaway.label
                        let imageName = castaway.value
                        let imagePath = require(`./images/${imageName}.jpg`)
                        nameArray.push(
                            <div style={{ paddingBottom: '5px' }}>
                                <div style={{background: 'RGBA(0,0,0,.30)', }}>
                                <img
                                    alt={'eliminated-castaway'+castaway.value}
                                    src={imagePath}
                                    style={{ width: '150px', opacity: '0.3', filter: 'drop-shadow(1px 0px 4px #4444dd)' }}
                                />{' '}
                            </div>
                                {name}
                            </div>
                        )
                    }
                })
            }
            return nameArray
        }

        return (
            <div
                style={{
                    background: 'RGBA(248,247,217,0.02)'
                }}
            >
                <h3 style={{ textAlign: 'center' }}>Eliminated</h3>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                    }}
                >
                    {makeElimNames(this.props.castaways)}
                </div>
            </div>
        )
    }
}

export default Eliminated

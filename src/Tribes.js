import React, { Component } from 'react'

export default class Tribes extends Component {
    render() {
        const makeTribeNames = tribe => {
            let nameArray = []
            tribe.castaways.forEach((name, i) => {
                // let imageName = name.toLowerCase().replace(/ /g, '-')
                let imagePath = require(`./images/${name}.jpg`)
                if (tribe.eliminated[i] === 'FALSE') {
                    nameArray.push(
                        <div style={{paddingBottom: '10px'}}>
                            <img alt={'castaway-'+i} src={imagePath} style={{ width: '150px', filter: 'drop-shadow(1px 0px 4px RGBA(76,60,75,1.00))' }} />{' '}
                            <br />
                            <div style={{paddingRight: '5px'}}>{tribe.names[i]}</div>
                        </div>
                    )
                }
            })
            return nameArray
        }
        const makeTribes = tribes => {
            let finalTribeArray = []
            tribes.forEach(tribe => {
                let tribeArray = []
                tribeArray.push(
                    <div
                    >
                            <h4>{tribe.tribeName}</h4>
                            <hr />
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                            }}
                        >
                            {makeTribeNames(tribe)}
                        </div>
                    </div>
                )
                finalTribeArray.push(tribeArray)
            })
            return <div>{finalTribeArray}</div>
        }
        return (
            <div
                id="tribes"
                className="tribes"
                style={{ background: 'RGBA(248,247,217,0.02)' }}
            >
                <h3 style={{ textAlign: 'center' }}>Castaways</h3>
                {makeTribes(this.props.tribes)}
            </div>
        )
    }
}

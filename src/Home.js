import React, { Component } from 'react'
import Table from './Table'
import Tribes from './Tribes'
import Summary from './Summary'
import Rules from './Rules'
import Eliminated from './Eliminated'

class Home extends Component {
    render() {
        return (
            <div
                className="home"
                style={{
                    paddingLeft: '10%',
                    paddingRight: '10%'
                }}
            >
                <Table
                    tribals={this.props.tribals}
                    leader={this.props.leader}
                    data={this.props.tableData}
                />
                <br />
                <Summary summary={this.props.summary} />
                <br />
                <Tribes tribes={this.props.tribes} />
                <br />
                <Eliminated castaways={this.props.castaways} />
                <br />
                <Rules />
            </div>
        )
    }
}

export default Home

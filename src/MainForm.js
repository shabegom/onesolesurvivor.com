import React, { Component } from 'react';
import { Form, Select, Input } from 'formsy-react-components'
import { castawaysMultiSelect, castawaysDropDown,  tribals, idolActions } from './data.js'
import { Redirect } from 'react-router'

const Selected = (props) => <div style={{paddingLeft: '10%', width: '30%', marginLeft: '30%', marginBottom: '10px'}}>{props.selection && props.selection.join(' ')}</div>

const Selection = (props) => {

    return (
        <>
        <Select
            name={props.name}
            label={props.label}
            options={props.options}
            required={props.required || false}
            onChange={props.handleChange}
        />
        <Selected selection={props.selected}/>
    </>
    )

}


const displayMerged = (selectionChange) => {
	return (
		<div className="merged">
            <Selection name='immunity' label='Who won immunity?' options={castawaysDropDown} handleChange={selectionChange('immunity')} />
            <Selection name='reward' label='Who won reward?' options={castawaysDropDown} handleChange={selectionChange('reward')} />
		</div>
	)
}


const HandleIdol = (hasIdol) => {
	let idols = hasIdol.map(( castaway, i ) => {
		return (
			<div key={i} >
			{ castaway }
				                <Select
                    name={"idolAction-" + castaway}
                    options={idolActions}
                />
			</div>
		)

	})
	return (
		<div>
        {idols[0] ? <h3>Did anyone use their idol?</h3> : ''}
			{ idols }
		</div>
    )

}

    const Tribe = (props) => {
		return (
			<div>
			                <Input
                    name={"tribe-name-" + props.number}
                    value=""
                    type="text"
                    placeholder="Tribe Name"
                />
				                <Select
                    name={"tribe-members-" + props.number}
                    options={castawaysMultiSelect}
					help="hold command to choose multiple"
                    multiple
				/>
			</div>
		);
	}


const DisplayBuffs = (props) => {
const children = [];
        for (var i = 0; i < props.numTribes; i += 1) {
            children.push(<Tribe number={i} id={i} onChange={props.handleChange} selected={props.selected}/>);
        };
	return (
		<div className="buffs">
	<input type="button" className="btn btn-standard" name="new-tribe" onClick={props.addTribe} defaultValue="New Tribe" />
	<input type="button" className="btn btn-alert" name="remove-tribe" onClick={props.removeTribe} defaultValue="Remove Tribe" />
		{children}
		</div>
	)
}


class MainForm extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            merged: this.props.merged,
            buffs: false,
            numTribes: 2
        }
    }

selectionChange = stateKey => (element, event) => {
    if (this.state[stateKey]) {
        this.setState({[stateKey]: [...this.state[stateKey], event]})
    
    } else {this.setState({[stateKey]: [event]})}
    }

    mergeChange = (event) => {
    
            if (event.target.value === 'false') {
                this.setState({
                    merged: true
                })
            } else if (event.target.value === 'true') {
                this.setState({
                    merged: false
                })
            }
    
    }

        buffsChange = event => {
            if (event.target.value === 'false') {
                this.setState({
                    buffs: true
                })
            } else if (event.target.value === 'true') {
                this.setState({
                    buffs: false
                })
            }
        }
        handleAddTribe = event => {
            this.setState({ numTribes: this.state.numTribes + 1 })
        }

        handleRemoveTribe = event => {
            this.setState({ numTribes: this.state.numTribes - 1 })
        }

    processForm = data => {
        data.eliminated = this.state.eliminated
        data.idolFound = this.state.foundIdol
        data.reward = this.state.reward

        this.props.processForm(data)
    
    }
    render() {
        const displayForm = () => {
            return (
                    <div>
                    <Form onSubmit={data => this.processForm(data)} >
                        <Selection name='tribal' label='Select Which Tribal' selected={this.state.tribal} options={tribals} required={true} handleChange={this.selectionChange('tribal')}/>
                        <Selection name='eliminated' label='Who was eliminated?' selected={this.state.eliminated} options={castawaysDropDown} required={true} handleChange={this.selectionChange('eliminated')}/>
                        <Selection name='extinction' label='Did anyone return from extinction?' selected={this.state.extinction} options={castawaysDropDown} required={false} handleChanfe={this.selectionChange('extinction')} />
                            <Selection name='idolFound' label='Anyone find an idol?' selected={this.state.foundIdol} options={castawaysDropDown} handleChange={this.selectionChange('foundIdol')} />
			{ this.state.foundIdol ? HandleIdol(this.state.foundIdol) : ""}

        <div>
			<input type="checkbox" name="merge" checked= {this.state.merged} value= { this.state.merged }  onChange={this.mergeChange}/> Made it to the merge? <br />
			{ this.state.merged ? displayMerged(this.selectionChange) : ''}
        </div>
			<div>
			<input type="checkbox" name="buffs" value={ this.state.buffs }  onChange={this.buffsChange}/> Drop your buffs? <br />
            { this.state.buffs ? <DisplayBuffs numTribes={this.state.numTribes} handleChange={this.selectionChange} addTribe={this.handleAddTribe} removeTribe={this.handleRemoveTribe} />: "" }
			</div>
 <input style={{textAlign: 'center'}} className="btn btn-primary" formNoValidate={true} type="submit" defaultValue="Submit" />
                    </ Form>
                { this.props.fireRedirect && (<Redirect to={ '/' } />) }
                </div>
            )
        }
        return (
            <div>
            { this.props.loggedIn ? displayForm() : ""}
            </div>
        );
    }
}

export default MainForm

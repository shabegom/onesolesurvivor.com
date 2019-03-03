import React, { Component } from 'react';
import { Form, Select } from 'formsy-react-components'
import { castawaysMultiSelect, castawaysDropDown,  tribals } from './data.js'
import { Redirect } from 'react-router'

class MainForm extends Component {
    render() {
        const displayForm = () => {
            return (
                    <div>
                    <Form onSubmit={data => this.props.processForm(data)} >
                                <Select
                    name="tribal"
                    label="Choose which Tribal"
                    options={tribals}
                    required
                />

                                <Select
                    name="eliminated"
                    label="Who was eliminated?"
                    options={castawaysDropDown}
                    required
                />
                                <Select
                    name="extinction"
                    label="Did anyone return from extinction?"
                    options={castawaysDropDown}
                />
                                <Select
                    name="idolFound"
                    label="Anyone find an idol?"
                    options={castawaysDropDown}
                    help="hold command to choose multiple"
                    onChange={this.props.idolChange}
                />

                {this.props.children}
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

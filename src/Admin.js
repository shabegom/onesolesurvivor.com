import React from 'react'

const styles = {
    padding: '10px'

}


class Admin extends React.Component {
	render() {



		return (
			<div style={styles}>
			{ this.props.children }
			</div>

		)
	}

}

export default Admin


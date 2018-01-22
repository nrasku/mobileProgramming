import React, { Component } from 'react';
import './App.css';   
import ReactTable from 'react-table';
import 'react-table/react-table.css';                                                                                                                                             

class TodoTable extends Component {
	constructor(props) {
		super(props);
		this.state = {todoList: []}
	}
	render() {
		const columns = [{
			Header: 'Date',
			accessor: 'date'
		}, {
			Header: 'Description',
			accessor: 'description'
		}]
		return(
			<div className="App">
				<ReactTable data={this.props.todos} columns={columns} sortable='true' defaultPageSize='10' />
			</div>
		);
	}
}

export default TodoTable;
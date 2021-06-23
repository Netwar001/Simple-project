import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class Table extends Component {
    render() {
        return (
            <div>
                <BootstrapTable data={this.props.data}>
                    <TableHeaderColumn isKey dataField='_id'>
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='username'>
                        Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='is_verified'>
                        Verified
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}

export default Table;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import jQuery from 'jquery';
import { Headers } from 'scripts/commons/Headers';
import { PREFIX } from 'scripts/commons/Constants';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import filter from 'lodash/filter';

export default class Table extends Component {
    render() {
        const {datas} = this.props;
        const columns = Headers.map(header =>
            <TableHeaderColumn dataField={header.id}
                               key={Math.random()}
                               dataSort={ false }
                               width={header.width}
                               className={header.style}
                               columnClassName={header.style}>
                <span>{header.text}</span><br/>
            </TableHeaderColumn>
        );

        return (
            <BootstrapTable data={ datas } trClassName='fx-report-table'
                            keyField="id">
                {columns}
            </BootstrapTable>
        );
    }
}

Table.propTypes = {
    datas: PropTypes.array.isRequired
}

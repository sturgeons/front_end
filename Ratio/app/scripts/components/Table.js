import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Headers } from 'scripts/commons/Headers';
import { PREFIX } from 'scripts/commons/Constants';
import {
    BootstrapTable,
    TableHeaderColumn,
    ClearSearchButton,
    SearchField
} from 'react-bootstrap-table';
import filter from 'lodash/filter';

export default class Table extends Component {
    render() {
        const options = {
            clearSearch: true,
            clearSearchBtn: () => {
                return (
                    <ClearSearchButton btnText="清空条件" className="btn btn-primary"/>
                );
            },
            searchField: () => {
                return (
                    <SearchField placeholder='输入过滤条件'/>
                )
            }
        };
        const {datas} = this.props;
        const columns = Headers.map(header =>
            <TableHeaderColumn dataField={header.id}
                               key={Math.random()}
                               dataSort={ false }
                               width={header.width}>
                <span>{header.text}</span><br/>
                <span>{header.en}</span>
            </TableHeaderColumn>
        );

        return (
            <BootstrapTable data={ datas } options={ options }
                            trClassName={ this._trClassFormat.bind(this) }
                            keyField="id" search>
                {columns}
            </BootstrapTable>
        );
    }

    _trClassFormat(rowData, rIndex) {
        return (rIndex & 1) === 0 ? 'tr-odd-data' : 'tr-even-data';
    }
}

Table.propTypes = {
    datas: PropTypes.array.isRequired
}

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Row, Col} from 'react-bootstrap';
import values from 'lodash/values';
import findIndex from 'lodash/findIndex';

class Comp extends Component {
    render() {
        return (
            <BootstrapTable className={"store-message-container"}
                            data={ this.props.datas }
                            height={540}
                            trClassName={ this._trClassFormat.bind(this) }
                            scrollTop={ 'Bottom' }>
                  <TableHeaderColumn dataField='CONTENT' isKey={ true } width='80%'>包装条码</TableHeaderColumn>
                  <TableHeaderColumn dataField='DIFF'>在库时间(小时)</TableHeaderColumn>
            </BootstrapTable>
        );
    }

    _trClassFormat(rowData, rIndex) {
        return rowData.DIFF >= rowData.BASE_DIFF ? 'tr-can-out' : '';
    }
}

export default connect((state, ownProps) => ({
    datas: state.StoreReducer.stores
}))(Comp);

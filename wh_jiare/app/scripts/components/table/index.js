import React, {Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {connect} from 'react-redux';
import {Headers} from 'scripts/commons/Headers';
import Dialog from 'react-bootstrap-dialog';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';
import {Row, Col} from 'react-bootstrap';
import dateformat from 'dateformat';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRow: null
        }
    }

    render() {
		return (
            <div>
    			<BootstrapTable data={ this.props.datas }
                                keyField='qadno'
                                options={{
                                    onRowClick: this._rowClick.bind(this)
                                }}
                                trClassName={ this._trClassFormat.bind(this) }
                                tableStyle={{ fontWeight: "bolder" }}>
    				{this._getHeaders()}
    			</BootstrapTable>
                <Dialog ref="dialog"/>
            </div>
	    );
    }

    _rowClick(row) {
        if(row.qadno) {
            this.setState({selectedRow: row});
            clearTimeout(this.timeout);

            // 加载库位信息
            this.props.onSelected(row.qadno);

            this.props.onClicked(true);
            this.timeout = setTimeout(() => {
                this.setState({selectedRow: null});
                this.refs.dialog.hide();
                this.props.onClicked(false);
                this.props.onSelected("");
            }, 30000);
        }
    }

    _trClassFormat(rowData, rIndex) {
        return rowData == this.state.selectedRow ? 'tr-selected' : ((rIndex & 1) === 0 ? 'tr-odd' : '');
    }

    _getHeaders() {
        return Headers.map((item) =>{
            return (
                <TableHeaderColumn dataField={item.name.toString()}
                               headerAlign="center"
                               key={Math.random()}
                               width={item.width}
                               tdStyle={{fontSize: '11pt', fontWeight: 'bolder'}}>
                     {item.text}
                </TableHeaderColumn>
            )
        });
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeValue: (value) => { dispatch(changeValue("tips", value)) },
    onClicked: (value) => { dispatch(changeValue("showTips", value)) },
    onSelected: (value) => { dispatch(changeValue("qadno", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state, ownProps) => ({
    datas: state.PartsReducer.parts
}), mapDispatchToProps)(Comp);

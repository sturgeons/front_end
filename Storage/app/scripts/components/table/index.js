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

    componentWillReceiveProps(nextProps) {
        this.setState({selectedRow: nextProps.selected});
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
            this.setState({selectedRow: row.qadno});
            clearTimeout(this.timeout);

            // 加载库位信息
            this._load(row);

            this.props.onSelected(row.qadno);
            this.props.onClicked(true);
            this.timeout = setTimeout(() => {
                this.setState({selectedRow: null});
                this.refs.dialog.hide();
                this.props.onClicked(false);
            }, 30000);
        }
    }

    _load(row) {
        const comp = this;
        fetch(PREFIX + `MDstoreService/find?qadno=${row.qadno}`).then((resp) => {
            return resp.json();
        }).then((json) => {
            let index = 1;
            comp.refs.dialog.show({
                title: (
                    <Row style={{color: 'black', fontSize: '12pt', fontWeight: 'bolder'}}>
                        <Col md={2}>序号</Col>
                        <Col md={4}>生产批次</Col>
                        <Col md={2}>数量</Col>
                        <Col md={4}>库位</Col>
                    </Row>
                ),
                body: (
                    <div style={{color: 'black', width: "100%", height: "100%", padding: 5, margin: "0"}}>
                        {
                            json.length ?
                                json.map(item =>
                                    <Row key={Math.random()} style={{fontSize: '11pt', margin: '3px 0'}}>
                                        <Col md={2}>{index++}</Col>
                                        <Col md={4}>{item.BATCH_NO}</Col>
                                        <Col md={2}>{item.PART_COUNT}</Col>
                                        <Col md={4}>{item.UNIT_NAME}</Col>
                                    </Row>
                                )
                            : (<em>未找到该总成的库存信息</em>)
                        }
                    </div>
                ),
                bsSize: 'medium'
            });
            // 设定库位提示符
            comp.props.onChangeValue(json);
        }).catch(() => {
            // do something
        });
    }

    _trClassFormat(rowData, rIndex) {
        return rowData.qadno === this.state.selectedRow ? 'tr-selected' : ((rIndex & 1) === 0 ? 'tr-odd' : '');
    }

    _getHeaders() {
        return Headers.map((item) =>{
            return (
                <TableHeaderColumn dataField={item.name.toString()}
                               headerAlign="center"
                               key={Math.random()}
                               width={item.width}
                               tdStyle={{fontSize: '11pt', fontWeight: 'bolder'}}
                               columnClassName={ this._columnClassNameFormat.bind(this) }>
                     {item.text}
                </TableHeaderColumn>
            )
        });
    }

    _columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
        if(colIdx === 7) {
            return row.cur < row.min ? 'td-column-danger' : 'td-column-safe';
        }
        return '';
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeValue: (value) => { dispatch(changeValue("tips", value)) },
    onSelected: (value) => { dispatch(changeValue("selected", value)) },
    onClicked: (value) => { dispatch(changeValue("showTips", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state, ownProps) => ({
    datas: state.PartsReducer.parts,
    selected: state.SelectedReducer.selected
}), mapDispatchToProps)(Comp);

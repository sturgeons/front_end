import React, {Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {connect} from 'react-redux';
import {Headers} from 'scripts/commons/Headers';
import Dialog from 'react-bootstrap-dialog';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';
import {Row, Col} from 'react-bootstrap';
import Grid from './grid.js';

class Comp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
		return (
            <div style={{marginTop: '5px'}}>
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
        if(row.qadno.match(/[\w\d]+/)) {
            this.props.onSelected(row);
            clearTimeout(this.timeout);

            // 加载库位信息
            this._load(row);

            this.props.onClicked(true);
            this.timeout = setTimeout(() => {
                this.props.onSelected({});
                this.refs.dialog.hide();
                this.props.onClicked(false);
            }, 180000);
        }
    }

    _load(row) {
        const comp = this;
        fetch(PREFIX + `SLstoreService/find?qadno=${row.qadno}`).then((resp) => {
            return resp.json();
        }).then((json) => {
            const content = (() =>{
                const diveded = 15;// 以15条记录为一组进行数据分割
                let begin = 0;// 起始位置
                let components = [];
                // 创建数据表
                while(json.length > begin) {
                    // 这个是拆分一列的数据信息
                    components.push(json.slice(begin, begin += diveded));
                }
                let odd = true;

                return components.length ? components.map(comp =>
                    <Col md={4} key={Math.random()}>
                        <Grid datas={comp} odd={ odd = !odd }/>
                    </Col>
                ) : (<em>未找到该总成的库存信息</em>);
            })();

            comp.refs.dialog.show({
                title: (
                    <Row style={{color: 'black', fontSize: '12pt', fontWeight: 'bolder', textAlign: 'center'}}>
                        <Col md={4}>
                            <Row>
                                <Col md={3}>裁片零件</Col>
                                <Col md={5}>批次</Col>
                                <Col md={2}>数量</Col>
                                <Col md={2}>箱号</Col>
                            </Row>
                        </Col>
                        <Col md={4} className="alert_odd">
                            <Row>
                                <Col md={3}>裁片零件</Col>
                                <Col md={5}>批次</Col>
                                <Col md={2}>数量</Col>
                                <Col md={2}>箱号</Col>
                            </Row>
                        </Col>
                        <Col md={4}>
                            <Row>
                                <Col md={3}>裁片零件</Col>
                                <Col md={5}>批次</Col>
                                <Col md={2}>数量</Col>
                                <Col md={2}>箱号</Col>
                            </Row>
                        </Col>
                    </Row>
                ),
                body: (
                    <Row style={{color: 'black', width: "100%", height: "100%", padding: 5, margin: "0"}}>
                        {content}
                    </Row>
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
        return rowData.qadno == this.props.selectedRow.qadno ? 'tr-selected' : ((rIndex & 1) === 0 ? 'tr-odd' : '');
    }

    _getHeaders() {
        return Headers.map((item) =>{
            return (
                <TableHeaderColumn dataField={item.name.toString()}
                               headerAlign="center"
                               key={Math.random()}
                               width={item.width}
                               tdStyle={{fontSize: '10pt', fontWeight: 'bolder'}}>
                     {item.text}
                </TableHeaderColumn>
            )
        });
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeValue: (value) => { dispatch(changeValue("tips", value)) },
    onClicked: (value) => { dispatch(changeValue("showTips", value)) },
    onSelected: (value) => { dispatch(changeValue("selectedRow", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state, ownProps) => ({
    datas: state.PartsReducer.first,
    selectedRow: state.StaticReducer.selectedRow
}), mapDispatchToProps)(Comp);

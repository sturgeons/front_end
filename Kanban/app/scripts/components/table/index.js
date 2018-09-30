import React, {Component} from 'react';
import {connect} from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {keys, merge} from 'lodash';
import Editor from './Editor';
import Tooltip from 'rc-tooltip';
import DownTimeTips from './DownTimeTips';
import { changeValue } from 'scripts/actions';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    render() {
        const headers = this.props.point.line ? this._getEditableHeaders() : this._getReadonlyHeaders();
        const datas = this._getDatas();

		return (
        <Tooltip visible={this.state.visible} placement="top" animation="zoom" trigger="click" overlay={<DownTimeTips/>}>
    			<BootstrapTable data={ datas }
                    keyField='id'
                    headerStyle={{display: 'none'}}
                    options={{
                        onRowClick: (row) => {
                            if(this.props.point.line && row['cate'] != '停台(Downtime)') {
                                this.props.onClick(!this.state.visible);
                                this.setState({visible: !this.state.visible})
                            }
                        }
                    }}
                    cellEdit={{
                        // 如果当前生产线不为空，则允许编辑停台，否则不允许编辑停台
                        mode: 'click',
                        nonEditableRows: () => {
                            return datas.filter(data => data.id <  3).map(data => data.id);
                        }
                    }}
                    tableStyle={{ fontWeight: "bolder" }}>
    				{headers}
    			</BootstrapTable>
          </Tooltip>
	    );
    }

    _getEditableHeaders() {
        return [{name: 'cate'}].concat(this.props.datas).map((item) =>{
            return (
                <TableHeaderColumn dataField={'' + item.name}
                       dataAlign="center"
                       key={Math.random()}
                       customEditor={{ getElement: (onUpdate, props) => (
                           <Editor onUpdate={ onUpdate } ops={this.props.point.options} {...props}/>
                       ), customEditorParameters: { line: this.props.point.line, begin: item.name + ':00', end: item.name + ':59' } }}
                       editable={item.name != 'cate'}
                       width={item.name === 'cate' ? '225px' : 'auto'}
                       tdStyle={{fontSize: '16pt', fontWeight: 'bolder'}}>
                     {item.name}
                </TableHeaderColumn>
            )
        });
    }

    _getReadonlyHeaders() {
        return [{name: 'cate'}].concat(this.props.datas).map((item) =>{
            return (
                <TableHeaderColumn dataField={'' + item.name}
                       dataAlign="center"
                       key={Math.random()}
                       editable={false}
                       width={item.name === 'cate' ? '225px' : 'auto'}
                       tdStyle={{fontSize: '16pt', fontWeight: 'bolder'}}>
                     {item.name}
                </TableHeaderColumn>
            )
        });
    }

    /**
     * 转换数据模型
     */
    _getDatas() {
        return [
            merge({id: 1, cate: '目标(Target)'}, this._calPlan()),
            merge({id: 2, cate: '实际(Actual)'}, this._calculateActual()),
            merge({id: 3, cate: '停台(Downtime)'}, this.props.downminute)
        ]
    }

    _calPlan() {
        let datas = {};

        this.props.datas.map(item => {
            const key = item.name;
            datas[key] = item['目标(Target)'] | '';
        });
        return datas;
    }

    _calculateActual() {
        let datas = {};
        this.props.datas.map(item => {
            const key = item.name;
            let value = 0;
            keys(item).map(key => {
                if(key != 'name' && key != '目标(Target)') {
                    value += item[key] | 0;
                }
            });
            datas[key] = value;
        });
        return datas;
    }
}

const mapStateToProps = (state, ownProps) => ({
    point: state.PointsReducer.point,
    downminute: state.DownMinuteReducer.downminute,
    datas: state.ActualDataReducer.produce.datas
});

const mapDispatchToProps = (dispatch) => ({
    onClick: (value) => { dispatch(changeValue("edit", value)) }
});

export default connect( mapStateToProps, mapDispatchToProps )(Comp);

import React, {Component} from 'react';
import Item from './Item';
import Select from 'react-select';
import { PREFIX } from 'scripts/commons/Constants';
import uuid  from 'uuid/v4';
import {filter} from 'lodash';
import {connect} from 'react-redux';

/**
 * 计划编辑工具的信息列表
 */
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.datas,// 从上级页面传递进来的计划信息
			value: this.props.shifts,// 班次信息
            shifts: [],// 班次列表
            parts: [],// 零件信息
            disabled: false// 组件是否被禁用标识(非新增元素禁止编辑零件号)
        };
        this.parts = []
    }

    // 组件初始化需要组织上一页面传递过来的数据信息
    componentWillMount() {
        const me = this; let shifts = [], parts = [];

        // 组织信息列表，包括班次信息、零件信息
        fetch(PREFIX + 'MDshiftService/find').then((resp) => {
            return resp.json();
        }).then((json) => {
            json.map(item => {
                shifts.push({ value: item.SHIFT_NAME, label: item.SHIFT_NAME })
            });
        }).then(() => {// 本条生产线所生产的零件信息
            fetch(PREFIX + `STpartnoService/find?LINE=${me.props.line}`).then((resp) => {
                return resp.json();
            }).then((json) => {
                json.map(item => {
                    parts.push({
                        value: item.VALUE,
                        label: item.VALUE + ' - ' + item.PARTNO,
                        partno: item.PARTNO
                    })
                });
            }).then(() => {
                if(parts.length === 0) {
                    this.setState({disabled: true});
                }
                me.setState({shifts: shifts, items: me.props.datas, parts: parts});
            });
        })
    }

    render() {
        return (
            <div className="container-plan-dialog">
                <div className="fx-dialog-shift-container">
                    <h3 className="section-heading">当日计划生产班次</h3>
                    <Select multi placeholder="" className="fx-shift-combo"
                        options={this.state.shifts}
                        value={this.state.value}
                        onChange={this._onShiftChange.bind(this)}
                    />
                </div>
                <div className="fx-dialog-plan-item-container">
                    {
                        this.state.items.map(item =>
                            <Item key={Math.random()} onDel={this._onDel.bind(this)} partlist={this.parts} item={item} items={this.state.items}/>
                        )
                    }
                </div>
                <button className="btn btn-info btn-block" onClick={this._onAdd.bind(this)} disabled={this.state.disabled}>
                    <span className="glyphicon glyphicon-plus"></span> &nbsp;增加新计划条目
                </button>
            </div>
        )
    }

    // 变更选择的班次信息
    _onShiftChange(value) {
        this.setState({ value });
        this.props.shifts.length = 0;
        value.map(option => {// 记录当前用户选择的班次信息
            this.props.shifts.push(option.value);
        });
    }

    // 增减零件计划
    _onAdd() {
        let obj = this.state.items.find(item => item.phantom);
        if(obj) { delete obj.phantom; }// 保证列表中只有一条新增元素

        // 为了用户的编辑方便，我们将新增的数据放在列表的最上面
        this.state.items.push({
            sysid: uuid(),// UUID 每行都有一个独立的ID，便于以后的管理
            partno: '',// 默认选中的零件号
            qadno: '',
            plan_count: '0',// 计划数量
            phantom: true,// 原子标识，代表这个元素是新增元素
            color: "#00bc58",// 为零件选取的颜色
            is_force: 0// 是否强制拉动
        });
        this.setState({items: this.state.items, disabled: this._hasParts()});
    }

    // 删除零件计划
    _onDel(id) {
        const result = filter(this.state.items, obj => obj.sysid != id);
        this.state.items.length = 0;
        result.map(obj => {
            delete obj.phantom;
            this.state.items.push(obj);
        });
        // 因为是删除操作，所以这里可以确定结果是种未false
        this.setState({items: this.state.items, disabled: !(this._hasParts() | true)});
    }

    // 计算是否还有零件可供选择
    _hasParts() {
        let parts = [];
        this.state.parts.map(part => {
            const item = this.state.items.find(obj => obj.partno === part.partno);
            if(!item) {
                parts.push(part);
            }
        });
        return (this.parts = parts).length <= 1;
    }
}

import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import Keyboard from './Keyboard';
import ColorPicker from './ColorPicker';
import Select from 'react-select';

/**
 * 单条的计划组件
 */
export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.partlist[0]
        }
    }

    render() {
        const comp = this._adpterComponent();
        const is_force = this.props.item.is_force === "1";

        return (
            <Row>
                <Col md={1}>
                    <ColorPicker defaultColor={this.props.item.color}
                        onChange={
                            (color) => {this.props.item.color = color}
                        }
                    />
                </Col>
                <Col md={5} style={{paddingLeft:'2px'}}>
                    {comp}
                </Col>
                <Col md={6}>
                    <Col md={5} style={{padding:'0'}}>
                        <Keyboard value={this.props.item.plan_count} onChange={this._onChange.bind(this)}/>
                    </Col>
                    <Col md={2} style={{paddingLeft: '2px'}}>
                        <span className="input-plan-del glyphicon glyphicon-minus" onClick={this._onDel.bind(this)}></span>
                    </Col>
                    <Col md={3}>
                        <label className="text-center" style={{paddingTop:'10px'}}>强制拉动</label>
                    </Col>
                    <Col md={2} style={{marginLeft: '-15px'}}>
                        <input type="checkbox" style={{width:'35px',height:'35px'}} defaultChecked={is_force} ref="chk_force" onChange={this._checkForce.bind(this)}/>
                    </Col>
                </Col>
            </Row>
        )
    }

    // 根据记录状态，适配的设定组件
    _adpterComponent() {
        if(!this.props.item.phantom) {// 分新增组件零件号不可编辑
            return (<label className="input-plan-label">{this.props.item.qadno}</label>);
        } else {// 如果是新增记录，则应该提供下拉列表来选择零件信息
            if(this.props.item.partno === '') {
                this.props.item.partno = this.state.value.partno;
                this.props.item.qadno = this.state.value.value;
            }
            return (
                <Select clearable={false} placeholder="" className="fx-partlist-combo"
                    value={this.state.value}
                    options={this.props.partlist}
                    onChange={
                        (option) => {
                            this.props.item.partno = option.partno;
                            this.props.item.qadno = option.value;

                            this.setState({value: option.value});
                        }
                    }
                />
            );
        }
    }

    // 修改数据
    _onChange(value) {
        this.props.item.plan_count = value;
    }

    // 强制拉动
    _checkForce(obj){
        const chk = this.refs.chk_force;
        $.each($('input[type=checkbox]:checked'), function() {
            const dom = $(this).get(0);

            if(dom != chk) {
                $(this).get(0).checked = false;
            }
        });
        this.props.items.map(item => item.is_force = "0");
        this.props.item.is_force = chk.checked ? "1" : "0";
    }

    // 删除数据
    _onDel() {
        this.props.onDel(this.props.item.sysid);
    }
}

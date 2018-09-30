import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import ItemList from './ItemList';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue } from 'scripts/actions';
import Alert from 'react-s-alert';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = { datas: [] }
    }

    componentWillReceiveProps(nextProps) {
        let datas = [];
        nextProps.plans.map(plan => {
            datas.push({
                sysid: plan.SYSID,
                partno: plan.PARTNO,
                qadno: plan.QADNO,
                plan_count: plan.PLAN_COUNT,
                color: plan.COLOR_HEX,
                shifts: plan.SHIFTS,
                is_force: plan.IS_FORCE
            })
        });
        this.setState({datas: datas});
    }

    render() {
        const {children} = this.props;

        return (
            <div>
                <Button bsSize='large'
                        className={"plan-dialog-btn"}
                        bsStyle="primary"
                        disabled={ this.props.line.length===0 }
                        onClick={ this._onClick.bind(this) }>
        		    {children}
        		</Button>
                <Dialog ref="dialog"/>
            </div>
        )
    }

    _onClick() {
        let datas = [].concat(this.state.datas);
        let shifts = datas.length ? datas[0].shifts.split(',') : [];

        this.refs.dialog.show({
            title: '维护生产计划信息',
            body: (
                <div>
                    <ItemList datas={datas} line={this.props.line} shifts={shifts}/>
                    <Alert stack={{limit: 1}} />
                </div>
            ),
            bsSize: 'large',
            actions: [
                Dialog.Action(
                    "取消",
                      () => {
                          this.props.onClick(false);
                          this.refs.dialog.hide();
                      },
                    'btn-default'
                ),
                Dialog.DefaultAction(
                    "确认",
                      (e) => {
                          this.props.onClick(false);
                          this.refs.dialog.show();
                          if(shifts.length === 0) {
                             return this._alertMsg('没有选择班次.');
                          }
                          this._onSubmit(datas, shifts);
                      },
                    'btn-primary'
                )
            ],
            onHide: (dialog) => {
                // The dialog prevented closing by clicking background.
            }
        });
        this.props.onClick(true);
    }

    _onSubmit(datas, shifts) {
        const comp = this;
        fetch(PREFIX + `MDplanService/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                datas: comp._handleData(datas, shifts),
                line: comp.props.line
            })
        }).then(() => {
            comp.refs.dialog.hide();
        }).then(function(response){
            setTimeout(() => comp.props.onSubmit(), 100);
        }).catch(function(error) {
            console.log(error);
        })
    }

    _handleData(datas, shifts) {
        let res = [];
        datas.map(data => {
            res.push({
                line: this.props.line,
                shifts: shifts.toString(),
                partno: data.partno,
                qadno: data.qadno,
                plan_count: data.plan_count,
                color_hex: data.color,
                is_force: data.is_force
            });
        });
        return res;
    }

    _alertMsg(msg) {
        Alert.error(msg, {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
        });
    }
}

const mapStateToProps = (state) => ({
    line: state.LineReducer.line.value,
    plans: state.PlanReducer.plans
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (value) => { dispatch(changeValue("fresh")) },
    onClick: (value) => { dispatch(changeValue("edit", value)) }
});

export default connect( mapStateToProps, mapDispatchToProps )(Comp);

import React, {Component} from 'react';
import {Row, Col, ControlLabel, FormGroup, FormControl, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import OutStoreLogConsole from './OutStoreLogConsole';
import StatisConsole from './StatisConsole';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = { options: [] }
    }
    componentWillMount() {
        this.props.dataLoading();
        const comp = this;
        fetch(PREFIX + 'ZPinspectorService/find').then((resp) => {
            return resp.json();
        }).then((json) => {// 数据库下拉类表数据的整理
            let options = [{value: '', label: ''}];
            json.map(item => {
                options.push({
                    value: item.INSPECTOR_NO,
                    label: item.INSPECTOR_NAME + ' [' + item.INSPECTOR_NO + ']'
                })
            });// 数据整理完成，通知组件重新渲染
            comp.setState({options: options});
        }).catch(() => {
            // do something
        }).then(function(){
            comp.props.dataLoaded();
            setTimeout(() => comp.refs.inp_code.focus(), 600);
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <FormGroup>
                          <Col className={'control-label fx-label'} md={2}>检验员:</Col>
                          <Col md={10}>
                                <select className={'fx-select-box fx-select'}
                                        ref="emp"
                                        onChange={(event) => {
                                            this.props.onEdit(true);
                                            this.refs.inp_code.value = null
                                            this.refs.inp.value = null;
                                            this.refs.status.innerHTML = null;
                                            setTimeout(() => this.refs.inp_code.focus(), 600);
                                            this.props.onEdit(false);
                                        }}>
                                {
                                    this.state.options.map(option =>
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    )
                                }
                                </select>
                           </Col>
                    </FormGroup>
                </Row>

                <Row style={{marginTop: '5px'}}>
                    <FormGroup>
                          <Col componentClass={ControlLabel} md={2}>总成条码:</Col>
                          <Col md={10}>
                                <input className="form-control" ref="inp_code"
                                       placeholder="装配条码扫描"
                                       onFocus={(event) => {event.target.select()}}
                                       onKeyPress={this._onCodeKeyPress.bind(this)}/>
                           </Col>
                    </FormGroup>
                </Row>

                <Row style={{marginTop: '5px'}}>
                    <FormGroup>
                          <Col componentClass={ControlLabel} md={2}>当前状态:</Col>
                          <Col md={10}>
                                <span ref="status" className={"fx-status"}></span>
                           </Col>
                    </FormGroup>
                </Row>

                <Row style={{marginTop: '5px'}}>
                      <Col componentClass={ControlLabel} md={2}>返修结果:</Col>
                      <Col md={4}>
                            <input className="form-control" ref="inp"
                                   placeholder="返修结果扫描"
                                   onFocus={(event) => {event.target.select()}}
                                   onKeyPress={this._onKeyPress.bind(this)}/>
                       </Col>

                       <Col componentClass={ControlLabel} md={2}>总成确认:</Col>
                       <Col md={4}>
                             <input className="form-control" ref="inp_confirm"
                                    placeholder="总成确认扫描"
                                    disabled={true}
                                    onFocus={(event) => {event.target.select()}}
                                    onKeyPress={this._onConfirmPress.bind(this)}/>
                        </Col>
                </Row>

                <Row style={{marginTop: '5px'}}>
                    <StatisConsole/>
                </Row>

                <Row style={{marginTop: '5px'}}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} md={2}>提示信息:</Col>
                        <Col md={10}><span ref="msg" className="wh-store-default">扫描有效包装条码，执行入库操作</span></Col>
                    </FormGroup>
                </Row>
                <hr/>
                <OutStoreLogConsole/>
            </div>
        )
    }

    _onCodeKeyPress(event) {
        if(event.key=== 'Enter') {// 回车提交
            const comp = this;
            const val = this.refs.inp_code.value.toUpperCase();
            this.props.onEdit(true);

            if(!this.refs.emp.value) {
                this._showMessage('未选择检验员', false);
                comp.refs.inp_code.select();
                comp.props.onEdit(false);
                return;
            }

            comp.props.dataLoading();
            return fetch(PREFIX + `RPstoredataService/inStore`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    content: val
                })
            }).then((resp) => {
                return resp.json();
            }).then((json) => {
                if(json.success) {
                    this.refs.status.innerHTML = json.message;
                    // 只有状态为待检的数据才能扫描
                    if(json.message.match(/[\[\]\>]/)) {
                        setTimeout(() => this.refs.inp_code.select(), 600);
                    } else {
                        this.refs.msg.innerHTML = "扫描返修结果";
                        setTimeout(() => {comp.refs.inp.select();}, 600);
                    }
                } else {
                    comp._showMessage(json.message, false);
                    setTimeout(() => this.refs.inp_code.select(), 600);
                }
            }).catch(function(error) {
                // console.log(error);
            }).then(function(){
                comp.props.onSubmit();
                comp.props.dataLoaded();
                comp.props.onEdit(false);
                comp.refs.inp.value = null;
            });
        }
    }

    // 录入状态，并提交数据
    _onKeyPress(event) {
        if(event.key=== 'Enter') {// 回车提交
            const comp = this;
            const val = this.refs.inp.value.toUpperCase();
            this.props.onEdit(true);

            if(!this.refs.emp.value || !this.refs.inp_code.value || !val) {
                this.refs.inp.value = null;
                this._showMessage('信息录入不完全[检验员，条码，质量]', false);
                setTimeout(() => comp.refs.inp_code.select(), 600);
                comp.props.onEdit(false);
                return;
            }
            this.refs.inp_confirm.disabled = val === 'NOK';
            if(this.refs.inp_confirm.disabled) {
                return this._commit(this.refs.inp);
            }
            setTimeout(() => comp.refs.inp_confirm.select(), 600);
        }
    }

    _onConfirmPress(event) {
        if(event.key=== 'Enter') {// 回车提交
            const comp = this;
            const val = this.refs.inp_confirm.value.toUpperCase();
            this.props.onEdit(true);

            if(!this.refs.emp.value || !this.refs.inp_code.value ||
               !this.refs.inp.value || !val) {
                this.refs.inp.value = this.refs.inp_confirm.value = null;
                this._showMessage('信息录入不完全[检验员，条码，质量, 总成确认]', false);
                setTimeout(() => comp.refs.inp_code.select(), 600);
                comp.props.onEdit(false);
                return;
            }
            this.refs.inp_confirm.disabled = true;
            this._commit(this.refs.inp);
        }
    }

    _commit(ref) {
        var comp = this;
        comp.props.dataLoading();
        return fetch(PREFIX + `RPstoredataService/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                emp: this.refs.emp.value,
                content: this.refs.inp_code.value.toUpperCase(),
                status: this.refs.inp.value,
                confirm: this.refs.inp_confirm.value.toUpperCase()
            })
        }).then((resp) => {
            return resp.json();
        }).then((json) => {
            if(json.success) {
                this.refs.status.innerHTML = null;
                this.refs.inp.value = null;
                this.refs.inp_code.value = null;
                this.refs.inp_confirm.value = null;
                comp._showMessage(json.message, true);
                setTimeout(() => comp.refs.inp_code.select(), 600);
            } else {
                comp._showMessage(json.message, false);
                setTimeout(() => ref.select(), 600);
            }
        }).catch(function(error) {
            // console.log(error);
        }).then(function(){
            comp.props.onSubmit();
            comp.props.dataLoaded();
            comp.props.onEdit(false);
        });
    }

    _showMessage(msg, flg) {
        if(flg) {// 成功信息
            this.refs.msg.innerHTML = "<span class='wh-store-success'>" + msg + "</span>"
        } else {// 失败信息
            this.refs.msg.innerHTML = "<span class='wh-sotre-failure'>" + msg + "</span>"
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (value) => { dispatch(changeValue("fresh")) },
    onEdit: (value) => { dispatch(changeValue("edit", value)) },
    onTips: (value) => { dispatch(changeValue("tips", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state, ownProps) => ({
    randomKey: ownProps.randomKey
}), mapDispatchToProps)(Comp);

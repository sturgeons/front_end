import React, {Component} from 'react';
import {Row, Col, ControlLabel, FormGroup, FormControl, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';
import FullScreen from 'scripts/components/FullScreen';

class Comp extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.actived === 'out') {
            this.refs.inp.value = this.refs.box_inp.value = null;
            this.refs.msg.innerHTML = '<span ref="msg" className="wh-store-default">扫描有效包装条码，执行入库操作</span>';
        }
    }

    render() {
        return (
            <Row>
                <Col md={1}>
                    <Button bsSize="large"
                            bsStyle={
                                this.props.actived === 'in' ? "success" : "default"
                            }
                            className="console-btn"
                            onClick={this._onClick.bind(this)}>
                        入<br/>库
                    </Button>
                </Col>
                <Col md={11}>
                    <Row>
                        <Col md={9}>
                            <FormGroup>
                                  <Col componentClass={ControlLabel} md={2}>裁片条码:</Col>
                                  <Col md={10}>
                                        <input className="form-control" ref="inp" autoFocus
                                               placeholder="裁片条码扫描"
                                               disabled = {this.props.actived != 'in'}
                                               onFocus={(event) => { event.target.select(); }}
                                               onKeyPress={this._onKeyPress.bind(this)}/>
                                   </Col>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                  <Col componentClass={ControlLabel} md={4}>箱号:</Col>
                                  <Col md={8}>
                                        <input className="form-control" ref="box_inp"
                                               placeholder="箱号"
                                               disabled = {this.props.actived != 'in'}
                                               onFocus={(event) => { event.target.select(); }}
                                               onKeyPress={this._onBoxKeyPress.bind(this)}/>
                                   </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '15px'}}>
                        <Col md={12}>
                            <FormGroup>
                                <Col componentClass={ControlLabel} md={2}>提示信息:</Col>
                                <Col md={10}><span ref="msg" className="wh-store-default">扫描有效包装条码，执行入库操作</span></Col>
                            </FormGroup>
                        </Col>
                        <FullScreen/>
                    </Row>
                </Col>
            </Row>
        )
    }

    _onKeyPress(event) {
        if(event.key=== 'Enter') {// 回车提交
            this.props.onEdit(true);

            const invoker = this.refs.inp;
            const comp = this;
            const val = invoker.value.toUpperCase();

            if(val.match(/^\(.+\)$/g)) {
                const code_arr = val.replace(/[()]+/, '').split('|');

                if(code_arr.length > 6) {
                    setTimeout(() => this.refs.box_inp.focus(), 300);
                    return;
                }
            }
            this._showMessage('裁片条码无效', false, invoker);
            this.props.onEdit(false);
        }
    }

    _onBoxKeyPress(event) {
        if(event.key=== 'Enter') {// 回车提交
            const invoker = this.refs.inp;
            const val = this.refs.box_inp.value.toUpperCase();
            const comp = this;

            if(val.length > 0) {
                comp.props.dataLoading();
                const content = comp.refs.inp.value.toUpperCase();
                const code_arr = content.replace(/[()]+/, '').split('|');

                return fetch(PREFIX + `SLstoredataService/inStore`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        packid: code_arr[0],// 编码
                        qadno: code_arr[2],// 零件号
                        count: code_arr[5] | 0,// 数量
                        content: content,
                        boxno: val
                    })
                }).then((resp) => {
                    return resp.json();
                }).then((json) => {
                    if(json.success) {
                        comp.refs.inp.value = comp.refs.box_inp.value = null;
                        comp._showMessage(json.message, true, invoker);
                    } else {
                        comp._showMessage(json.message, false, invoker);
                    }
                }).catch(function(error) {
                    // console.log(error);
                }).then(function(){
                    comp.props.onSubmit();
                    comp.props.dataLoaded();
                    comp.props.onEdit(false);
                    setTimeout(() => comp.refs.inp.select(), 500);
                });
            }
            this._showMessage('箱号不能为空', false, this.refs.box_inp);
            this.props.onEdit(false);
        }
    }

    _onClick(e) {
        this.props.onActive('in');
        setTimeout(() => this.refs.inp.focus(), 300);
    }

    _showMessage(msg, flg, invoker) {
        if(flg) {// 成功信息
            this.refs.msg.innerHTML = "<span class='wh-store-success'>" + msg + "</span>"
        } else {// 失败信息
            this._alertWarm(invoker);
            this.refs.msg.innerHTML = "<span class='wh-sotre-failure'>" + msg + "</span>"
        }
    }

    _alertWarm(invoker) {
        const me = this;
        let count = 7;

        this.refs.inp.disabled = this.refs.box_inp.disabled = true;

        let timmer = setInterval(() => {
            if(count-- < 0) {
                setTimeout(() => {
                    this.refs.inp.disabled = this.refs.box_inp.disabled = false;
                    invoker.select();
                }, 300);
                clearInterval(timmer);
                return;
            }
            me.props.onError(!me.props.error);
        }, 300);
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (value) => { dispatch(changeValue("fresh")) },
    onEdit: (value) => { dispatch(changeValue("edit", value)) },
    onTips: (value) => { dispatch(changeValue("tips", value)) },
    onActive: (value) => { dispatch(changeValue("actived", value)) },
    onError: (value) => { dispatch(changeValue("error", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state, ownProps) => ({
    randomKey: ownProps.randomKey,
    fresh: state.StaticReducer.fresh,
    error: state.StaticReducer.error,
    actived: state.StaticReducer.actived
}), mapDispatchToProps)(Comp);

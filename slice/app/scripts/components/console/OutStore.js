import React, {Component} from 'react';
import {Row, Col, ControlLabel, FormGroup, FormControl, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

class Comp extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.actived === 'in') {
            this.refs.inp.value = null;
            this.refs.msg.innerHTML = '<span ref="msg" className="wh-store-default">扫条码,执行出库操作</span>';
        }
    }

    render() {
        return (
            <Row>
                <Col md={2}>
                    <Button bsSize="large"
                            bsStyle={
                                this.props.actived === 'out' ? "success" : "default"
                            }
                            className="console-btn"
                            onClick={this._onClick.bind(this)}>
                        出<br/>库
                    </Button>
                </Col>
                <Col md={10}>
                    <Row>
                        <FormGroup>
                              <Col componentClass={ControlLabel} md={3}>裁片条码:</Col>
                              <Col md={9}>
                                    <input className="form-control" ref="inp"
                                           placeholder="出库条码扫描"
                                           disabled = {this.props.actived != 'out'}
                                           onFocus={(event) => {event.target.select()}}
                                           onKeyPress={this._onKeyPress.bind(this)}/>
                               </Col>
                        </FormGroup>
                    </Row>
                    <Row style={{marginTop: '15px'}}>
                        <FormGroup>
                            <Col componentClass={ControlLabel} md={3}>提示信息:</Col>
                            <Col md={9}><span ref="msg" className="wh-store-default">扫条码,执行出库操作</span></Col>
                        </FormGroup>
                    </Row>
                </Col>
            </Row>
        )
    }
    _onKeyPress(event) {
        if(event.key=== 'Enter') {// 回车提交
            const comp = this;
            const val = this.refs.inp.value.toUpperCase();

            if(val.match(/^\(.+\)$/g)) {
                const code_arr = val.replace(/[()]+/, '').split('|');
                this.props.onEdit(true);

                if(code_arr.length > 6) {
                    comp.props.dataLoading();
                    return fetch(PREFIX + `SLstoredataService/outStore`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            packid: code_arr[0],// 编码
                            qadno: code_arr[2],// 零件号
                            count: code_arr[5] | 0,// 数量
                            content: val
                        })
                    }).then((resp) => {
                        return resp.json();
                    }).then((json) => {
                        if(json.success) {
                            comp.refs.inp.value = null;
                            comp._showMessage(json.message, true);
                        } else {
                            comp._showMessage(json.message, false);
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
            }
            this._showMessage('裁片条码无效', false);
            comp.refs.inp.select();
            comp.props.onEdit(false);
        }
    }

    _onClick(e) {
        this.props.onActive('out');
        setTimeout(() => this.refs.inp.focus(), 300);
    }

    _showMessage(msg, flg) {
        if(flg) {// 成功信息
            this.refs.msg.innerHTML = "<span class='wh-store-success'>" + msg + "</span>"
        } else {// 失败信息
            this._alertWarm();
            this.refs.msg.innerHTML = "<span class='wh-sotre-failure'>" + msg + "</span>"
        }
    }

    _alertWarm(invoker) {
        const me = this;
        let count = 7;

        this.refs.inp.disabled = true;

        let timmer = setInterval(() => {
            if(count-- < 0) {
                setTimeout(() => {
                    me.refs.inp.disabled = false;
                    me.refs.inp.select();
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

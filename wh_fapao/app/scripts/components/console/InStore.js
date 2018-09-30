import React, {Component} from 'react';
import {Row, Col, ControlLabel, FormGroup, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import INStoreLogConsole from './INStoreLogConsole';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

class Comp extends Component {
    componentWillReceiveProps(nextProps) {
        setTimeout(() => this.refs.inp.focus(), 300);
    }

    render() {
        return (
            <div>
                <Row>
                    <FormGroup>
                          <Col componentClass={ControlLabel} md={2}>扫描条码:</Col>
                          <Col md={10}>
                                <input className="form-control" ref="inp" autoFocus
                                       placeholder="入库条码扫描"
                                       onFocus={(event) => {event.target.select()}}
                                       onKeyPress={this._onKeyPress.bind(this)}/>
                           </Col>
                    </FormGroup>
                </Row>

                <Row style={{marginTop: '5px'}}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} md={2}>提示信息:</Col>
                        <Col md={10}><span ref="msg" className="wh-store-default">扫描有效包装条码，执行入库操作</span></Col>
                    </FormGroup>
                </Row>

                <hr/>
                <INStoreLogConsole/>
            </div>
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
                    return fetch(PREFIX + `WHfapaostoredataService/inStore`, {
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
                            comp.props.onSubmit();
                            comp.refs.inp.value = null;
                            comp._showMessage(json.message, true);
                        } else {
                            comp._showMessage(json.message, false);
                        }
                    }).catch(function(error) {
                        // console.log(error);
                    }).then(function(){
                        comp.props.dataLoaded();
                        comp.props.onEdit(false);
                        setTimeout(() => comp.refs.inp.select(), 500);
                    });
                }
            }
            this._showMessage('包装条码无效', false);
            comp.refs.inp.select();
            this.props.onEdit(false);
        }
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

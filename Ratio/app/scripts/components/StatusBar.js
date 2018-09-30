import React, {Component} from 'react';
import Alert from 'react-s-alert';
import { PREFIX } from 'scripts/commons/Constants';
import Dialog from 'react-bootstrap-dialog';
import ListPanel from './ListPanel';
import {Row, Col} from 'react-bootstrap';

export default class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        }
    }

    componentDidUpdate() {
        setTimeout(() => this.refs.txt.focus(), 500);
    }

    componentDidMount() {
        this.refs.txt.focus();
        window.addEventListener('keypress', this._onKeyPress.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('keypress', this._onKeyPress);
    }

    render() {
        const { cls, children } = this.props;
        const { autoFocus, disabled } = this.state;

        return (
            <Row className="form-inline status-bar">
                <Col md={9} mdOffset={1} style={{"paddingRight":0}}>
                    <input className="form-control" ref="txt"
                    placeholder="扫描包装条码" autoFocus
                    onKeyPress={this._onKeyPress.bind(this)}
                    readOnly={disabled}
                    onFocus={() => {
                        const obj = this.refs.txt;
                        if(obj) {
                            obj.select();
                        }
                    }}/>
                </Col>
                <Col md={2} style={{"paddingLeft":0}}>
                    <button ref="btn" className="btn btn-default" onClick={this._onClick.bind(this)} disabled={disabled}>确认补料</button>
                    <Alert stack={{limit: 1}} />
                    <Dialog ref="dialog"/>
                </Col>
            </Row>
        )
    }

    _onKeyPress(event) {
        if(event.keyCode === 13) {// 回车提交打印
            this.refs.btn.click();
        }
    }

    _onClick() {
        this.setState({disabled: true});
        const val = this.refs.txt.value.toUpperCase();

        if(val.match(/^\(.+\)$/g)){
            const code_arr = val.replace(/[()]+/, '').split('|');
            this.props.onEdit(true);// 补料的时候需要挂起自动更新

            // 方向盘出库条码
            if(code_arr.length === 10) { code_arr[3] = code_arr[2]; }

            // 标准零件条码
            if(code_arr.length > 9) {// 保存录入信息
                const lines = this._mappingOneLine(code_arr[3]);

                if(lines.length > 1) {// 多条生产线需要提示对话框
                    return this._showDialog(code_arr, lines);
                } else if(lines.length === 1) {// 零件只对应一条产线的情况，直接提交
                    return this._check(code_arr, lines[0].LINE, lines[0].OP);
                }

                console.log(lines.length)
            }
        }
        this._alertMsg('录入条码无效，请确认后重新录入.');
    }

    _mappingOneLine(partno) {
        return this.props.lineparts.filter((item) => item.PARTNO === partno);
    }

    _check(code_arr, line, op) {
        this.props.dataLoading();
        const comp = this;
        return fetch(PREFIX + `MDpartdataService/check`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                partno: code_arr[3],// 零件号
                line: line,// 生产线
                op: op// 工序
            })
        }).then((resp) => {
            return resp.json();
        }).then((json) => {
            if(json.success) {
                return this._submit(code_arr, line, op);
            }
            this.refs.dialog.show({
                title: '是否强制补料',
                body: (
                    <div style={{width: "100%", height: "100%", padding: "0", margin: "0"}}>
                        <p className="failureReason">{json.failureReason}</p>
                    </div>
                ),
                bsSize: 'medium',
                actions: [
                    Dialog.Action(
                        "取消",
                          () => {
                              this.refs.dialog.hide();
                              setTimeout(() => {this.refs.txt.value = ''; this.setState({disabled: false})}, 200);
                              this.props.onEdit(false);
                          },
                        'btn-default'
                    ),
                    Dialog.DefaultAction(
                        "确认",
                          (e) => {
                              setTimeout(() => this._submit(code_arr, line, op), 100);
                          },
                        'btn-primary'
                    )
                ],
                onHide: (dialog) => {
                    // The dialog prevented closing by clicking background.
                }
            });
        }).catch(function(error) {
            console.log(error);
        }).then(function(){
            comp.props.dataLoaded();
            comp.props.onEdit(false);
        });
    }

    _submit(code_arr, line, op) {
        this.props.dataLoading();
        const comp = this;
        return fetch(PREFIX + `MDpartdataService/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: code_arr[0],
                partno: code_arr[3],// 零件号
                count: code_arr[5] | 0,// 数量
                line: line,// 生产线
                full: this.refs.txt.value,// 完整条码
                op: op// 生产工序
            })
        }).then((resp) => {
            return resp.json();
        }).then((json) => {
            if(json.success) {
                setTimeout(() => comp.props.onSubmit(), 100);
                setTimeout(() => { comp.refs.txt.value = ''; comp.setState({disabled: false}); }, 1000);
            } else {
                setTimeout(() => comp._alertMsg(json.failureReason), 600);
            }
        }).catch(function(error) {
            console.log(error);
        }).then(function(){
            comp.props.dataLoaded();
            comp.props.onEdit(false);
        });
    }

    _showDialog(code_arr, lines) {
        let selecteItem = {LINE: lines[0].LINE, OP: lines[0].OP};

        this.refs.dialog.show({
            title: '选择要补料的生产线--工位',
            body: (
                <div style={{width: "100%", height: "100%", padding: "0", margin: "0"}}>
                    <ListPanel lines={lines} selecteItem={selecteItem}/>
                </div>
            ),
            bsSize: 'medium',
            actions: [
                Dialog.Action(
                    "取消",
                      () => {
                          this.refs.dialog.hide();
                          setTimeout(() => {this.refs.txt.value = ''; this.setState({disabled: false})}, 200);
                          this.props.onEdit(false);
                      },
                    'btn-default'
                ),
                Dialog.DefaultAction(
                    "确认",
                      (e) => {
                          setTimeout(() => this._check(code_arr, selecteItem.LINE, selecteItem.OP), 100);
                      },
                    'btn-primary'
                )
            ],
            onHide: (dialog) => {
                // The dialog prevented closing by clicking background.
            }
        });
    }

    _alertMsg(msg) {
        Alert.error(msg, {
            position: 'bottom',
            effect: 'stackslide',
            timeout: 1000,
            onClose: () => {
                setTimeout(() => {
                    this.refs.txt.value = '';
                    this.setState({disabled: false});
                    this.props.onEdit(false);
                }, 100);
            }
        });
    }
}

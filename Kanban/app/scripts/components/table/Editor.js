import React, {Component} from 'react';
import DateTime from 'react-datetime';
import {Row, Col} from 'react-bootstrap';
import Select from 'react-select';
import { PREFIX } from 'scripts/commons/Constants';
import Alert from 'react-s-alert';
import {connect} from 'react-redux';
import { changeValue } from 'scripts/actions';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            op: null,
            open: true,
            reason: null,
            options: []
        };
    }

    componentWillMount() {
        this.props.onTrigger(true);
        const comp = this;
        fetch(PREFIX + 'MDreasonService/find').then((response) => {
            return response.json();
        }).then((json) => {
            var options = [];
            json.map(item => {
                options.push({
                    value: item.SYSID,
                    label: item.REASON_NAME
                })
            });
            comp.setState({ options: options });
        }).catch(() => {
            // do something
        });
    }

    componentWillUnmount() {
        this.props.onTrigger(false);
    }

    render() {
        const {open} = this.state;
        const fadeIn = open ? 'in' : '';
        const display = open ? 'block' : 'none';

        return (
            <div>
                <div data-reactroot role="dialog" >
                    <div className={`${fadeIn} fade`}></div>
                    <div className={ `modal fade ${fadeIn}` } id='myModal' role='dialog' style={ { display } }>
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    记录停台信息
                                </div>
                                <div className='modal-body'>
                                    <Row>
                                        <Col md={2}>
                                            <label style={{fontSize: '16pt'}}>故障原因</label>
                                        </Col>
                                        <Col md={10}>
                                            <Select placeholder="" className="fx-editor-combo"
                                                    clearable={false}
                                                    value={this.state.reason}
                                                    onChange={(value) => {this.setState({reason: value})}}
                                                    options={this.state.options}
                                            />
                                        </Col>
                                    </Row>

                                    <br/>

                                    <Row>
                                        <Col md={2}>
                                            <label style={{fontSize: '16pt'}}>生产工位</label>
                                        </Col>
                                        <Col md={10}>
                                            <Select placeholder=""
                                                    value={this.state.op}
                                                    className="fx-editor-combo"
                                                    clearable={false}
                                                    onChange={(value)=>{this.setState({op: value})}}
                                                    options={this.props.ops}/>
                                        </Col>
                                    </Row>

                                    <br/>

                                    <div>
                                        <Row>
                                            <Col md={2}>
                                                <label style={{fontSize: '16pt'}}>停台时间</label>
                                            </Col>
                                            <Col md={5}>
                                                <label style={{fontSize: '16pt', color: 'gray'}}>开始时间</label>
                                                <DateTime ref='begin_time' dateFormat={false} timeFormat={"H:mm"} defaultValue={this.props.begin}/>
                                            </Col>
                                            <Col md={5}>
                                                <label style={{fontSize: '16pt', color: 'gray'}}>结束时间</label>
                                                <DateTime ref='end_time' dateFormat={false} timeFormat={"H:mm"} defaultValue={this.props.end}/>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className='modal-footer'>
                                    <button className='btn btn-primary' onClick={ this._onSubmit.bind(this) }>保存</button>
                                    <button className='btn btn-default' onClick={ this._close.bind(this) }>取消</button>
                                </div>
                            </div>
                            <Alert stack={{limit: 1}} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _close() {
        this.setState({ open: false });
        this.props.onUpdate(this.props.defaultValue);
    }

    _onSubmit() {
        const comp = this;
        const {reason, op} = this.state;
        const begin_time = this.refs.begin_time.state.inputValue;
        const end_time = this.refs.end_time.state.inputValue;

        if(reason === null || op === null){ return comp._showMessage('停台原因或工位为空'); }
        if(end_time <= begin_time) {return comp._showMessage('停台时间无效，结束时间必须大于开始时间');}

        fetch(PREFIX + `MDdowntimeService/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                reason: reason.value,
                op: op.value,
                begin_time: begin_time,
                end_time: end_time,
                line: this.props.line
            })
        }).then(function(response){
            comp._close();
        }).then(function(response){
            setTimeout(() => comp.props.onChangeValue(), 100);
        }).catch(() => {
            // do something
        })
    }

    _showMessage(msg) {
        Alert.error(msg, {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
        });
    }
}

const mapDispatchToProps = (dispatch) => ({
    onChangeValue: (value) => { dispatch(changeValue("fresh")) },
    onTrigger: (value) => { dispatch(changeValue("edit", value)) }
});

export default connect( () => ({}), mapDispatchToProps )(Comp);

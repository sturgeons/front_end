import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeValue } from 'scripts/actions';
import { Row, Col, Button, Panel } from 'react-bootstrap';
import Clock from './Clock';
import InStore from './InStore';
import OutStore from './OutStore';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {clicked: ''}
    }

    componentDidUpdate(nextProps) {
        if(!this.props.edit) {
            clearTimeout(this.timeout);
            return this.timeout = setTimeout(() => {
                this.setState({clicked: ''});
                nextProps.onClicked(false);
            }, 30000);
        }
        clearTimeout(this.timeout);
    }

    render() {
        const view_panel = this.state.clicked ? (
            this.state.clicked === 'in' ? <InStore randomKey={Math.random()}/> : <OutStore randomKey={Math.random()}/>
        ) : <Clock/>;

        return (
            <Row className="console-panel">
                <Col md={2}>
                    <Row>
                        <Button bsSize="large"
                                bsStyle={this.state.clicked === 'in' ? "success" : "default"}
                                className="console-btn"
                                id="in"
                                onClick={this._onClick.bind(this)}>
                            入<br/>库
                        </Button>
                    </Row>
                    <Row>
                        <Button bsSize="large"
                                bsStyle={this.state.clicked === 'out' ? "info" : "default"}
                                className="console-btn"
                                id="out"
                                onClick={this._onClick.bind(this)}>
                            出<br/>库
                        </Button>
                    </Row>
                </Col>
                <Col md={10}>
                    {view_panel}
                </Col>
            </Row>
        )
    }

    _onClick(e) {
        this.setState({clicked: e.target.id });
        this.props.onClicked(true);
    }
}

const mapDispatchToProps = (dispatch) => ({
    onClicked: (value) => { dispatch(changeValue("clicked", value)) }
});

export default connect((state, cls) => ({
    id: state.id,
    edit: state.StaticReducer.edit
}), mapDispatchToProps)(Comp);

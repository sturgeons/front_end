import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeValue } from 'scripts/actions';
import { Row, Col, Button, Panel } from 'react-bootstrap';
import Clock from './Clock';
import OutStore from './OutStore';
import FullScreen from 'scripts/components/FullScreen';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {clicked: ''}
    }

    componentDidUpdate(nextProps) {
        // if(!this.props.edit) {
        //     clearTimeout(this.timeout);
        //     return this.timeout = setTimeout(() => {
        //         this.setState({clicked: ''});
        //         nextProps.onClicked(false);
        //     }, 30000);
        // }
        // clearTimeout(this.timeout);
    }

    render() {
        const view_panel =  <OutStore randomKey={Math.random()}/>;

        return (
            <Row className="console-panel">
                <Col md={2}>
                    <Row>
                        <Button bsSize="large"
                                bsStyle={"info"}
                                className="console-btn"
                                id="out">
                            晾<br/>晒<br/>出<br/>库
                        </Button>
                    </Row>
                    <Row>
                        <FullScreen/>
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

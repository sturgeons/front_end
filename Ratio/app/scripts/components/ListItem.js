import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

export default class extends Component {
    render() {
        const className = this.props.active ? "list-group-item active" : "list-group-item";

        return (<a href="#" className={className}
                   onClick={this._onClick.bind(this)}
                   style={{fontSize: "15pt", fontWeigth: "bolder"}}
                   >
                   <Row>
                       <Col md={10}>{this.props.name}</Col>
                       <Col md={2}>{this.props.op}</Col>
                   </Row>
                </a>);
    }

    _onClick() {
        this.props.click(this.props.name, this.props.op);
    }
}

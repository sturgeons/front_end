import React, {Component} from 'react';
import {connect} from 'react-redux';

class comp extends Component {
    render() {
        const qadno = this.props.lastpart.QAD_NO;

        return (
            <input className="form-control fx-input-readonly" readOnly value={qadno ? qadno : ''}/>
        )
    }
}

export default connect(
    (state) => ({
        lastpart: state.LastPartReducer.lastpart
    })
)(comp);

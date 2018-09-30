import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';

class comp extends Component {
    render() {
        const value = this.props.oee.PERCENT;

        return (
            <input className="form-control fx-input-readonly" readOnly value={value ? value + '%' : ''}/>
        )
    }
}


export default connect(
    (state) => ({
        oee: state.OEEReducer.oee
    })
)(comp);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';

class comp extends Component {
    render() {
        const count = this.props.oeedata;// OEE当前值
        const oee = this.props.oee.PERCENT;// OEE 的基值

        return (
            <input className="form-control fx-input-readonly"
                   readOnly value={count ? count + '%' : ''}
                   style={count < oee ? {color: 'red'} : {}}
             />
        )
    }
}


export default connect(
    (state) => ({
        oeedata: state.StaticReducer.oeedata,
        oee: state.OEEReducer.oee
    })
)(comp);

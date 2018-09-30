import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';

class comp extends Component {
    render() {
        const plans = this.props.plans;

        let value = '';
        if(plans.length > 0) {
            value = plans[0].SHIFTS;
        }
        return (
            <input className="form-control fx-input-readonly" readOnly value={value ? value : ''}/>
        )
    }
}

export default connect(
    (state) => ({
        plans: state.PlanReducer.plans
    })
)(comp);

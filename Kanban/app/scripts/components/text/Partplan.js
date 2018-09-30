import React, {Component} from 'react';
import {connect} from 'react-redux';

class comp extends Component {
    render() {
        const {lastpart, plans} = this.props;
        let value = lastpart.QAD_NO;

        if(value) {
            var obj = plans.find(plan => plan.QADNO === value);
            value = obj ? obj.PLAN_COUNT : '';
        }

        return (
            <input className="form-control fx-input-readonly" readOnly value={value ? value : ''}/>
        )
    }
}

export default connect(
    (state) => ({
        lastpart: state.LastPartReducer.lastpart,
        plans: state.PlanReducer.plans
    })
)(comp);

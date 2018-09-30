import React, {Component} from 'react';
import {connect} from 'react-redux';
import {filter, keys} from 'lodash';

/**
 * 当班实际生产，根据生产数据进行计算
 */
class comp extends Component {
    render() {
        let number = 0;
        this.props.datas.map(item => {
            const objs = keys(item).filter(key => key != 'name' && key != '目标(Target)');
            objs.map((obj) => {
                number += (item[obj] | 0);
            });
        });

        return (
            <input className="form-control fx-input-readonly" readOnly value={number ? number : ''}/>
        )
    }
}

export default connect(
    (state) => ({
        datas: state.ProduceReducer.produce.datas
    })
)(comp);

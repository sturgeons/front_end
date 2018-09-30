import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

/**
 * 这是一个后台任务组件，用来获取计划信息
 */
class Comp extends Component {
    componentWillReceiveProps(nextProps) {
        const comp = this, {value} = nextProps.line;
        this.props.dataLoading();
        fetch(PREFIX + `STplanService/find?LINE=${value}`).then((resp) => {
            return resp.json();
        }).then((json) => {
            nextProps.onChangeValue({plans: json});
        }).catch(() => {
            // do something
        }).then(function(){
            comp.props.dataLoaded();
        });
    }

    render() {
        return (
            <input type="hidden"/>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeValue: (value) => { dispatch(changeValue("plans", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state) => ({
    line: state.LineReducer.line,
    fresh: state.StaticReducer.fresh
}), mapDispatchToProps)(Comp);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

/**
 * 这是一个后台任务组件，用来获取最后生产的零件信息
 */
class Comp extends Component {
    componentDidMount() {
        this._load();
    }

    componentWillReceiveProps(nextProps) {
        this._load();
    }

    _load() {
        const comp = this;
        this.props.dataLoading();
        fetch(PREFIX + `LSoutstorehisService/find`).then((resp) => {
            return resp.json();
        }).then((json) => {
            comp.props.onChangeValue(json);
        }).catch(() => {
            // do something
        }).then(() => {
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
    onChangeValue: (value) => { dispatch(changeValue("outstore", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state) => ({
    fresh: state.StaticReducer.fresh
}), mapDispatchToProps)(Comp);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

/**
 * 获取工位信息
 */
class Comp extends Component {
    componentWillReceiveProps(nextProps) {
        const comp = this, {dbname, value} = nextProps.line;
        this.props.dataLoading();
        fetch(PREFIX + `STopService/find?DBNAME=${dbname}&LINE=${value}`).then((resp) => {
            return resp.json();
        }).then((json) => {
            let options = [{value: '', label: ''}];
            json.map(item => {
                options.push({
                    value: item.OP, label: item.OP
                })
            });

            // 向服务器传值
            nextProps.onChangeValue({point: {
                options: options,
                dbname: dbname,
                line: value
            }});
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
    onChangeValue: (value) => { dispatch(changeValue("op_caches", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state) => ({
    line: state.LineReducer.line
}), mapDispatchToProps)(Comp);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';
import { PREFIX } from 'scripts/commons/Constants';

/**
 * 生产线下拉列表组件
 */
class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = { options: [], value: '' }
    }

    // 只有在数据库信息发生变更的时候，才会触发生产线的数据拉取服务
    componentWillReceiveProps(nextProps) {
        const comp = this, {dbname} = nextProps;
        this.props.dataLoading();
        fetch(PREFIX + `STlineService/find?DBNAME=${dbname}`).then((resp) => {
            return resp.json();
        }).then((json) => {
            let options = [{value: '', label: ''}];
            json.map(item => {
                options.push({
                    value: item.LINE,
                    label: item.LINE
                })
            });
            comp.setState({options: options, value: ''});
            this._postToReducer(nextProps.dbname, '');
        }).catch(() => {
            // do something
        }).then(function(){
            comp.props.dataLoaded();
        });
    }

    render() {
        return (
            <select className={'fx-select-box fx-select'}
			        onChange={this._onChange.bind(this)}
                    value={this.state.value}
			        ref="comp">
                {
                    this.state.options.map(option =>
                        <option key={option.value} value={option.value}>{option.label}</option>
                    )
                }
			</select>
        )
    }

    _onChange() {
        this.setState({value: this.refs.comp.value});
        this._postToReducer(this.props.dbname, this.refs.comp.value);
    }

    _postToReducer(dbname, value) {
        this.props.onChangeValue({
            line: {
                value: value,
                dbname: dbname
            }
        });
    }
}

// 订阅Reducer的信息，单向数据流的核心，只关注上游对象或属性
const mapStateToProps = (state, ownProps) => ({
    dbname: state.StaticReducer.dbname
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeValue: (value) => { dispatch(changeValue("line", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect(mapStateToProps, mapDispatchToProps )(Comp);

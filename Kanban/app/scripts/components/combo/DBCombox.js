import React, {Component} from 'react';
import {connect} from 'react-redux';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';
import { PREFIX } from 'scripts/commons/Constants';

/**
 *  数据库信息下拉列表
 */
class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = { options: [] }
    }

    /**
     * 组件初始化的时候进行数据加载
     */
    componentWillMount() {
        this.props.dataLoading();
        const comp = this;
        fetch(PREFIX + 'MDdatabaseService/find').then((resp) => {
            return resp.json();
        }).then((json) => {// 数据库下拉类表数据的整理
            let options = [{value: '', label: ''}];
            json.map(item => {
                options.push({
                    value: item.DBNAME,
                    label: item.DBNAME
                })
            });// 数据整理完成，通知组件重新渲染
            comp.setState({options: options});
            comp.props.onChangeValue('');
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
			        ref="comp">
                {
                    this.state.options.map(option =>
                        <option key={option.value} value={option.value}>{option.label}</option>
                    )
                }
			</select>
        )
    }

    _onChange() {// 发布事件数据流
        this.props.onChangeValue(this.refs.comp.value);
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeValue: (value) => { dispatch(changeValue("dbname", {dbname: value})) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect( () => ({}), mapDispatchToProps )(Comp);

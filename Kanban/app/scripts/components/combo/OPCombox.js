import React, {Component} from 'react';
import {connect} from 'react-redux';
import { changeValue } from 'scripts/actions';
import { PREFIX } from 'scripts/commons/Constants';

/**
 * 生产工位下拉列表组件
 */
class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }
    }

    componentWillReceiveProps(nextProps) {
        const {dbname, line} = nextProps.point;
        this._postToReducer(dbname, line, '');
    }

    render() {
        return (
            <select className={'fx-select-box fx-select'}
			        onChange={this._onChange.bind(this)}
                    value={this.state.value}
			        ref="comp">
                {
                    this.props.point.options.map(option =>
                        <option key={option.value} value={option.value}>{option.label}</option>
                    )
                }
			</select>
        )
    }

    _onChange() {// 保存当前选中的工位信息，此外需要增加一个工位列表，后续的功能会用到
        const {dbname, line} = this.props.point;
        this._postToReducer(dbname, line, this.refs.comp.value);
    }

    _postToReducer(dbname, line, value) {
        this.setState({value: value});
        this.props.onChangeValue({
            op: {
                dbname: dbname,
                line: line,
                value: value
            }
        });
    }
}

const mapStateToProps = (state) => ({
    point: state.PointsReducer.point
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeValue: (value) => { dispatch(changeValue("op", value)) }
});

export default connect(mapStateToProps, mapDispatchToProps )(Comp);

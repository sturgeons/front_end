import React, {Component} from 'react';
import {connect} from 'react-redux';
import findIndex from 'lodash/findIndex';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onoff: true
        }
    }

    componentWillReceiveProps(nextProps) {
        const index = findIndex(nextProps.tips, (obj => obj.UNIT_NAME === nextProps.text));

        if(index !== -1) {
            setTimeout(() => {
                this.setState({onoff: !this.state.onoff});
                setTimeout(() => {
                    this.setState({onoff: !this.state.onoff});
                    setTimeout(() => {
                        this.setState({onoff: !this.state.onoff});
                        setTimeout(() => {
                            this.setState({onoff: !this.state.onoff});
                            setTimeout(() => {
                                this.setState({onoff: !this.state.onoff});
                                setTimeout(() => {
                                    this.setState({onoff: !this.state.onoff});
                                }, 500);
                            }, 500);
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }
    }

    render() {
        if(this.props.text === '-1') {
            return <div className=" block"></div>
        }
        return <div className={this.state.onoff ? this.props.cssStyle : 'label-danger'}  onClick={this._onClick.bind(this)}>{this.props.text}</div>
    }

    _onClick(){
        this.props.onClick(this.props.text);
    }
}

export default connect((state, ownProps) => ({
    text: ownProps.text,
    cssStyle: ownProps.cssStyle,
    tips: state.TipsReducer.tips,
    onClick: ownProps.onClick
}))(Comp);

import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 * Label 组件，页面中所有的标签都是用该组件渲染
 */
class Comp extends Component {
    render() {
        const {children, cls} = this.props;
        return (
            <div className={cls}>{children}</div>
        )
    }
}

export default connect(
    (state, ownProps) => ({ cls: ownProps.cls })
)(Comp);

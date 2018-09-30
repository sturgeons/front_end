import React, {Component} from 'react';
import {connect} from 'react-redux';
import {buttonClick} from 'scripts/actions';
import Classnames from 'classnames';
import {Button as BootstrapButton} from 'react-bootstrap';

/**
 * 检测按钮控件
 */
class Comp extends Component {
    render() {
        const {children, actived} = this.props;
        return (
            <BootstrapButton bsSize='large'
                bsStyle={Classnames({  'danger': !actived, 'success': actived })}
                onClick={this._onClick.bind(this)}>
    		    {children}
    		</BootstrapButton>
        )
    }

    _onClick(e) {
        e.preventDefault();
        this.props.onClick(this.props.id);
    }
}

const mapStateToProps = (state, ownProps) => ({
    actived: state.ButtonReducer[ownProps.id]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: (id) => {dispatch(buttonClick(id))}
});

export default connect( mapStateToProps, mapDispatchToProps )(Comp);

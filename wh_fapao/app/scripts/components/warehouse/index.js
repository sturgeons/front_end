import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Unit from './Unit';
import values from 'lodash/values';
import findIndex from 'lodash/findIndex';

class Comp extends Component {
    render() {
        return (
            <div className="fx-unit-container">
                {
                    this.props.units.map(row =>
                        <Row key={Math.random()} className="fx-unit-row">
                                {
                                    values(row).map(unit =>{
                                        const index = findIndex(this.props.stores, (obj => obj.UNIT_NAME === unit));
                                        const pobj = this.props.stores[index];
                                        return (
                                            <Col key={Math.random()} md={1} className="fx-unit-col">
                                                <Unit text={unit} cssStyle={
                                                    pobj ? (pobj.DIFF < pobj.BASE_DIFF ? 'label-primary label-error' : 'label-primary') : 'label-default'
                                                }/>
                                            </Col>
                                        )
                                    })
                                }
                        </Row>
                    )
                }
            </div>
	    );
    }
}

export default connect((state, ownProps) => ({
    units: state.UnitsReducer.units,
    stores: state.StoreReducer.stores
}))(Comp);

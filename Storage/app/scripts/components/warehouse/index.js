import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Unit from './Unit';
import values from 'lodash/values';
import { PREFIX } from 'scripts/commons/Constants';
import findIndex from 'lodash/findIndex';
import Dialog from 'react-bootstrap-dialog';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

class Comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUnit: null
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selectedUnit: nextProps.selected});
    }

    render() {
        return (
            <div className="fx-unit-container">
                {
                    this.props.units.map(row =>
                        <Row key={Math.random()} className="fx-unit-row">
                                {
                                    values(row).map(unit =>{
                                        const index = findIndex(this.props.stores, (obj => obj.UNIT_NAME === unit));
                                        return (
                                            <Col key={Math.random()} md={1} className="fx-unit-col">
                                                <Unit text={unit}
                                                      cssStyle={ unit === this.state.selectedUnit ? 'label-success' : (index !== -1 ? 'label-primary' : 'label-default')}
                                                      onClick={this._unitClick.bind(this)}/>
                                            </Col>
                                        )
                                    })
                                }
                        </Row>
                    )
                }
                <Dialog ref="dialog"/>
            </div>
	    );
    }

    _unitClick(unit) {
        this.setState({selectedUnit: unit});
        clearTimeout(this.timeout);

        // 加载库位信息
        this._load(unit);

        this.props.onSelected(unit);
        this.props.onClicked(true);
        this.timeout = setTimeout(() => {
            this.setState({selectedUnit: null});
            this.refs.dialog.hide();
            this.props.onClicked(false);
        }, 30000);
    }

    _load(unit) {
        const comp = this;
        fetch(PREFIX + `MDstoreService/find?unitname=${unit}`).then((resp) => {
            return resp.json();
        }).then((json) => {
            let index = 1;
            comp.refs.dialog.show({
                title: (
                    <Row style={{color: 'black', fontSize: '12pt', fontWeight: 'bolder'}}>
                        <Col md={4}>总成类型</Col>
                        <Col md={3}>总成号</Col>
                        <Col md={3}>批次</Col>
                        <Col md={2}>数量</Col>
                    </Row>
                ),
                body: (
                    <div style={{color: 'black', width: "100%", height: "100%", padding: 5, margin: "0"}}>
                        {
                            json.length ?
                                json.map(item =>
                                    <Row key={Math.random()} style={{fontSize: '11pt', margin: '3px 0'}}>
                                        <Col md={4}>{item.QAD_TYPE}</Col>
                                        <Col md={3}>{item.QADNO}</Col>
                                        <Col md={3}>{item.BATCH_NO}</Col>
                                        <Col md={2}>{item.PART_COUNT}</Col>
                                    </Row>
                                )
                            : (<em>未找到该总成的库存信息</em>)
                        }
                    </div>
                ),
                bsSize: 'medium'
            });
        }).catch(() => {
            // do something
        });
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSelected: (value) => { dispatch(changeValue("selected", value)) },
    onClicked: (value) => { dispatch(changeValue("showTips", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state, ownProps) => ({
    units: state.UnitsReducer.units,
    stores: state.StoreReducer.stores,
    selected: state.SelectedReducer.selected
}), mapDispatchToProps)(Comp);

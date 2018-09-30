import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import Carousel from './Carousel';

/**
 * 计划列表
 */
class Comp extends Component {
    constructor(props) {
        super(props);
        // 单行默认有5条记录
        this.state = { datas: new Array(5).fill({partno: '', plan_count: ''}) }
    }

    // 每次当上层驱动发生变化的时候，需要重新组织计划清单
    componentWillReceiveProps(nextProps) {
        let datas = [];
        nextProps.plans.map(plan => {
            datas.push({
                partno: plan.PARTNO,
                qadno: plan.QADNO,
                plan_count: plan.PLAN_COUNT,
                is_force: plan.IS_FORCE
            })
        });
        const diff = 5 - datas.length % 5;
        this.setState({datas: datas.concat(new Array(diff).fill({partno: '', plan_count: ''}))});
    }

    render() {
        const cls = "fx-label";
        return (
            <Col md={12} className='fx-list-panel-header'>
                <Row>
                    <Col md={6}>
                        <div className={cls}>
                            产品<br/>PartNo
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className={cls}>
                            计划<br/>Plan
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className={cls}>
                            实际<br/>Actual
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="fx-label-col">
                        {this._renderCells()}
                    </Col>
                </Row>
            </Col>
        );
    }

    // 渲染列表的单元格
    _renderCells(style = 'fx-label fx-plan-item') {
        const datas = [].concat(this.state.datas);
        let arr = [];

        while(datas.length) {
            let tmp = [];
            for(var i = 0; i < 5; i++) {tmp.push(datas.shift());}
            arr.push(tmp);
        }

        const nodes = arr.map(items => {
            return (
                <div className="fx-slick" key={Math.random()}>
                   {items.map(item =>{
                       const cssStyle = item.is_force === "0" ? style : (style + " fx-force-item");

                       return (
                           <Row key={Math.random()}>
                               <Col md={6}>
                                   <div className={cssStyle} style={{fontSize: "18pt", textAlign: 'left', paddingLeft: "5px"}}>
                                       {item.qadno}
                                   </div>
                               </Col>
                               <Col md={3}>
                                   <div className={cssStyle}>
                                       {item.plan_count}
                                   </div>
                               </Col>
                               <Col md={3}>
                                   <div className={cssStyle}>
                                        { this._getActualCount(item) }
                                   </div>
                               </Col>
                           </Row>
                        )
                    }
                   )}
               </div>
            )
        });

        return (
            <Carousel>
                {nodes}
            </Carousel>
        );
    }

    _getActualCount(item) {
        const part = this.props.datas.find(
            (obj => obj.PARTNO === item.partno )
        );
        return part ? part.TOTAL : '';
    }
}

const mapStateToProps = (state, ownPorps) => ({
    plans: state.PlanReducer.plans,
    datas: state.WorkDataReducer.workdata
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect( mapStateToProps, mapDispatchToProps )(Comp);

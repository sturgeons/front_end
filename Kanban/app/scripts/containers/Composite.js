import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Label from 'scripts/components/Label';
import Partshiftplan from 'scripts/components/text/Partshiftplan';
import Partshiftactual from 'scripts/components/text/Partshiftactual';
import Partactual from 'scripts/components/text/Partactual';
import Partplan from 'scripts/components/text/Partplan';
import Usedpercent from 'scripts/components/text/Usedpercent';
import OEEActual from 'scripts/components/text/OEEActual';

const CompositeBar = () => (
    <Row className='fx-actual-data'>
        <Col md={4}>
            <Row>
                <Col md={4} className='fx-label-col'>
                    <Label cls="fx-large-label sc-label">
                        班次产能
                        <br/>
                        Shift Capacity
                    </Label>
                </Col>
                <Col md={8}>
                    <Row>
                        <Col md={4} className='fx-label-col'>
                            <Label cls="fx-label-success">
                                目标
                                <br/>
                                Target
                            </Label>
                        </Col>
                        <Col md={8} className='fx-text-box-col'>
                            <Partshiftplan/>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4} className='fx-label-col'>
                            <Label cls="fx-label-detail">
                                实际
                                <br/>
                                Actual
                            </Label>
                        </Col>
                        <Col md={8} className='fx-text-box-col'>
                            <Partshiftactual/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>

        <Col md={4}>
            <Row>
                <Col md={4} className='fx-label-col'>
                    <Label cls="fx-large-label dd-label">
                        日生产计划
                        <br/>
                        Daily Plan
                    </Label>
                </Col>
                <Col md={8}>
                    <Row>
                        <Col md={4} className='fx-label-col'>
                            <Label cls="fx-label-success">
                                计划
                                <br/>
                                Plan
                            </Label>
                        </Col>
                        <Col md={8} className='fx-text-box-col'>
                            <Partplan/>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4} className='fx-label-col'>
                            <Label cls="fx-label-detail">
                                实际
                                <br/>
                                Actual
                            </Label>
                        </Col>
                        <Col md={8} className='fx-text-box-col'>
                            <Partactual/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>

        <Col md={4}>
            <Row>
                <Col md={4} className='fx-label-col'>
                    <Label cls="fx-large-label oee-label">
                        设备利用率
                        <br/>
                        OEE
                    </Label>
                </Col>
                <Col md={8}>
                    <Row>
                        <Col md={4} className='fx-label-col'>
                            <Label cls="fx-label-success">
                                目标
                                <br/>
                                Target
                            </Label>
                        </Col>
                        <Col md={8} className='fx-text-box-col'>
                            <Usedpercent/>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4} className='fx-label-col'>
                            <Label cls="fx-label-detail">
                                实际
                                <br/>
                                Actual
                            </Label>
                        </Col>
                        <Col md={8} className='fx-text-box-col'>
                            <OEEActual/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
	</Row>
)

export default CompositeBar

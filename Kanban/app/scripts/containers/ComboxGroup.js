import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Label from 'scripts/components/Label';
import DBCombox from 'scripts/components/combo/DBCombox';
import LineCombox from 'scripts/components/combo/LineCombox';
import OPCombox from 'scripts/components/combo/OPCombox';

const ComboxGroup = () => (
    <Row>
        <Col md={4}>
            <Row>
                <Col md={4} className='fx-label-col'>
                    <Label cls="fx-label">
                        服务器
                        <br/>
                        Server
                    </Label>
                </Col>
                <Col md={8} className='fx-com-col'>
                    <DBCombox/>
                </Col>
            </Row>
        </Col>


        <Col md={4}>
            <Row>
                <Col md={4} className='fx-label-col'>
                    <Label cls="fx-label">
                        生产线
                        <br/>
                        Line
                    </Label>
                </Col>
                <Col md={8} className='fx-com-col'>
                    <LineCombox/>
                </Col>
            </Row>
        </Col>

        <Col md={4}>
            <Row>
                <Col md={4} className='fx-label-col'>
                    <Label cls="fx-label">
                        工位
                        <br/>
                        OP
                    </Label>
                </Col>
                <Col md={8} className='fx-com-col'>
                    <OPCombox/>
                </Col>
            </Row>
        </Col>
	</Row>
)

export default ComboxGroup

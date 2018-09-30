import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Chart from 'scripts/components/chart';
import Table from 'scripts/components/table';

const Panel = () => (
    <Row>
        <Col md={12}>
            <Row>
                <Col md={12} className='fx-label-col'>
                    <Chart width={1000}
                           height={460}
                           margin={{top: 15, right: 5, left: 0, bottom: 5}}/>
                </Col>
            </Row>

            <Row>
                <Col md={12} className='fx-label-col' style={{padding: '0 5px 0 0'}}>
                    <Table/>
                </Col>
            </Row>
        </Col>
	</Row>
)

export default Panel

import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Console from 'scripts/Components/console';
import TableFirst from 'scripts/Components/table/first';
import TableSecond from 'scripts/Components/table/secord';
import TableThird from 'scripts/Components/table/third';
import Backtask from 'scripts/components/virtual';
import Loading from 'scripts/components/Loading';

const App = () => (
    <div>
        <Row>
            <Col md={12}>
                <Console/>
                <Backtask/>
            </Col>
        </Row>
        <Row>
            <Col md={4}>
                <TableFirst/>
            </Col>
            <Col md={4}>
                <TableSecond/>
            </Col>
            <Col md={4}>
                <TableThird/>
            </Col>
        </Row>
        <Loading/>
    </div>
)

export default App

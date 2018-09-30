import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Console from 'scripts/Components/console';
import Table from 'scripts/Components/table';
import Backtask from 'scripts/components/virtual';
import Loading from 'scripts/components/Loading';

const App = () => (
    <div>
        <Row>
            <Col md={6}>
                <Row>
                    <Col md={12}>
                        <Console/>
                        <Backtask/>
                    </Col>
                </Row>
            </Col>
            <Col md={6} style={{paddingRight: '0px'}}>
                <Table/>
            </Col>
        </Row>
        <Loading/>
    </div>
)

export default App

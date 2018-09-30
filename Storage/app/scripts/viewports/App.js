import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Console from 'scripts/Components/console';
import Table from 'scripts/Components/table';
import Warehouse from 'scripts/Components/warehouse';
import Backtask from 'scripts/components/virtual';
import Loading from 'scripts/components/Loading';
import FullScreen from 'scripts/components/FullScreen';

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
                <Row>
                    <FullScreen/>
                    <Warehouse/>
                </Row>
            </Col>
            <Col md={6} style={{paddingRight: '0px',overflowY: 'auto',height:'1040px'}}>
                <Table/>
            </Col>
        </Row>
        <Loading/>
    </div>
)

export default App

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TableWrap from '../containers/TableWrap';
import Loading from 'scripts/components/Loading';
import Backtask from 'scripts/components/virtual';

const App = () => (
    <div className="container-ratio">
        <div>
            <Row>
                <Col md={12}>
                    <TableWrap/>
                </Col>

                <Loading/>
                <Backtask/>
            </Row>
        </div>
    </div>
)

export default App

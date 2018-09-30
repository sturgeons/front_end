import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TableWrap from '../containers/TableWrap';
import StatusBarWrap from '../containers/StatusBarWrap';
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

            <nav className="navbar navbar-inverse navbar-fixed-bottom text-right">
                <StatusBarWrap>
                    补料
                </StatusBarWrap>
            </nav>
        </div>
    </div>
)

export default App

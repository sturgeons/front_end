import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'scripts/components/Button';
import Buttons from 'scripts/commons/Buttons';

const buttons = Buttons.map((item) =>
    <Col md={2} key={Math.random()} className='fx-button-col'>
        <Button id = {item.id}>
            {item.text}&nbsp;{item.id}
        </Button>
    </Col>
)

const ButtonBar = () => (
    <Row>
		{buttons}
	</Row>
)

export default ButtonBar

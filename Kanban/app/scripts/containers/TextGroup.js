import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Label from 'scripts/components/Label';
import LastPart from 'scripts/components/text/LastPart';
import Shift from 'scripts/components/text/Shift';
import Time from 'scripts/components/text/Time';

const TextboxBar = () => (
    <Row>
        <Col md={4}>
            <Row>
                <Col md={4} className='fx-label-col'>
                    <Label cls="fx-label">
                        产品
                        <br/>
                        PartNo
                    </Label>
                </Col>
                <Col md={8} className='fx-text-box-col'>
                    <LastPart/>
                </Col>
            </Row>
        </Col>

        <Col md={4}>
           <Row>
               <Col md={4} className='fx-label-col'>
                   <Label cls="fx-label">
                       计划班次
                       <br/>
                       Shift Plan
                   </Label>
               </Col>
               <Col md={8} className='fx-text-box-col'>
                   <Shift/>
               </Col>
           </Row>
       </Col>

       <Col md={4}>
            <Row>
                <Col md={4} className='fx-label-col'>
                    <Label cls="fx-label">
                        时间
                        <br/>
                        Time
                    </Label>
                </Col>
                <Col md={8} className='fx-text-box-col'>
                    <Time/>
                </Col>
            </Row>
        </Col>
	</Row>
)

export default TextboxBar

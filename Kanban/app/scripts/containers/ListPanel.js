import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Label from 'scripts/components/Label';
import List from 'scripts/components/list';
import Modal from 'scripts/components/list/Modal';
import Quality from 'scripts/components/list/Quality';

const ListPanelBar = () => (
    <Row style={{paddingRight:'4px'}}>
       <Col md={12}>
          <Row>
              <Col md={12} className='fx-label-col'>
                  <Label cls="fx-large-label fx-list-header">
                      当日计划/完成状态
                      <br/>
                      Daily Plan/Actual Status
                  </Label>
              </Col>
          </Row>
          <Row>
              <Col md={12} className='fx-label-col'>
                  <List/>
              </Col>
          </Row>
          <Row>
              <Col md={6} className='fx-label-col'>
                  <Modal>
                  计划输入/Plan Input &nbsp;<span className="glyphicon glyphicon-list"></span>
                  </Modal>
              </Col>
              <Col md={6} className='fx-label-col'>
                  <Quality>
                  检测信息录入&nbsp;<span className="glyphicon glyphicon-pencil"></span>
                  </Quality>
              </Col>
          </Row>
      </Col>
   </Row>
)

export default ListPanelBar

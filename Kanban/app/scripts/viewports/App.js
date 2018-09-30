import React from 'react';
import {history} from 'scripts/commons/History';
import { Router, Route, Switch } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import ButtonGroup from 'scripts/containers/ButtonGroup';
import ComboxGroup from 'scripts/containers/ComboxGroup';
import TextGroup from 'scripts/containers/TextGroup';
import Composite from 'scripts/containers/Composite';
import Panel from 'scripts/containers/Panel';
import ListPanel from 'scripts/containers/ListPanel';
import Loading from 'scripts/components/Loading';
import Backtask from 'scripts/components/virtual';
import Timer from 'scripts/components/Timer';
import FullScreen from 'scripts/components/FullScreen';

/**
 * 系统主页面的渲染
 */
class data_view extends React.Component {
    componentWillMount() {// 判断页面的来源方式，如果不是正常跳转到达，则退回到首页
        if(this.props.history.action != 'PUSH') {
            this.props.history.push('/kanban');
        }
    }

    render () {// 显示主功能面板
        if(this.props.history.location.pathname === '/show'){
            return (
                <div>
                    <ComboxGroup/>
                    <TextGroup/>
                    <hr/>
                    <Composite/>
                    <Row>
                        <Col md={8}>
                            <Panel/>
                        </Col>
                        <Col md={4}>
                            <ListPanel/>
                        </Col>
                    </Row>
                    <Loading/>
                    <Backtask/>
                </div>
            )
        }
        return (<div></div>);
    }
}

const App = () => (// 系统开始页面
    <div>
        <ButtonGroup/>
        <hr/>
        <Router history={history}>
            <div>
                <Switch>
                    <Route exact path='/kanban' component={() => (
                        <div className="jumbotron">
                            <Timer/>
                            <h1>请确认生产线准备就绪!</h1>
                            <h1>Please confirm OK to Start the Line!</h1>
                            <FullScreen/>
                        </div>
                    )} />
                    <Route path='/show' component={data_view} />
                </Switch>
            </div>
        </Router>
    </div>
)

export default App

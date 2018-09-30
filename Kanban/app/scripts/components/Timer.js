import React, {Component} from 'react';
import dateforamt from 'dateformat';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() }
    }

    componentWillMount() {// 设定计时器，按一定的时间周期进行页面的切换处理
        var comp = this;
        this.interval = setInterval(function(){
            comp.setState({date: new Date()});
        }, 1000);
    }

    componentWillUnmount() {//  清空计时器
        clearInterval(this.interval);
    }

    render() {//  在页面中显示时间控件
        return (
            <h1>{dateforamt(this.state.date, 'yyyy-mm-dd HH:MM:ss')}</h1>
        )
    }
}

import React, {Component} from 'react';
import DateForamt from 'dateformat';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {date: ''}
    }

    componentWillMount() {
        this.interval = setInterval(()=> {
            this.setState({date: new Date()});
        }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="console-clock">
                <div className="text-center">{DateForamt(this.state.date, 'yyyy-mm-dd')}</div>
                <div className="text-center">{DateForamt(this.state.date, 'HH:MM:ss')}</div>
            </div>
        )
    }
}

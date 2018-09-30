import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';

class comp extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }
    }

    componentWillMount(){
        this._intervalFetchTime();
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    render() {
        const value = this.state.value;
        return (
            <input className="form-control fx-input-readonly" readOnly value={value ? value : ''}/>
        )
    }

    _intervalFetchTime() {
        const comp = this;
        fetch(PREFIX + 'STtimeService/find').then(function(response) {
            return response.json();
        }).then(function(json){
            comp.setState({value: json.length ? json[0].value : ''});
            comp.timeout = setTimeout(function(){ comp._intervalFetchTime(); }, 60000)
        }).catch(() => {
            // do something
        })
    }
}

export default connect()(comp);

import React, {Component} from 'react';
import ListItem from './ListItem';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.selecteItem.LINE+this.props.selecteItem.OP
        }
    }

    render() {
        return (
            <div className="list-group" style={{padding: "0", margin: "0"}}>
                {
                    this.props.lines.map(obj =>
                        <ListItem active={this.state.active === obj.LINE + obj.OP}
                                  name={obj.LINE}
                                  op={obj.OP}
                                  key={Math.random()}
                                  click={this._onClick.bind(this)}/>
                    )
                }
            </div>
        )
    }

    _onClick(line, op) {
        this.setState({active: line + op});
        this.props.selecteItem.LINE = line;
        this.props.selecteItem.OP = op;
    }
}

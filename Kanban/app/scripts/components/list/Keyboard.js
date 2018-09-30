import React from "react";
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import keyboard from 'virtual-keyboard';

export default class extends React.Component {
    componentDidMount() {
        const {onChange} = this.props;
        const options = Object.assign({}, {
                display: {
                  'bksp'   : '←'
                },
                layout:'custom',
                customLayout: {
                  'normal' : [
                      '0 1 2 3 4 5 6 7 8 9 {bksp} {a} {c}'
                  ]
                },
                restrictInput : true,
                maxLength : 6,
                appendLocally: true,
                preventPaste : true,
                accepted: function(event, keyboard, el) {
                    onChange(keyboard.preview.value);
                }
        }, this.props.options);

        // Add jQuery Keyboard to DOM Element
        jQuery(ReactDOM.findDOMNode(this.refs.keyboard)).keyboard(options);
    }

    render() {
        return (
            <div className="form-group has-feedback">
                <input ref="keyboard"
                       className="form-control"
                       value = { this.props.value }
                       readOnly
                       onFocus = { this._select.bind(this) }/>
                <span className="glyphicon glyphicon-pencil form-control-feedback" aria-hidden="true"></span>
           </div>
        );
    }

    _select() {
        this.refs.keyboard.select();
    }
}

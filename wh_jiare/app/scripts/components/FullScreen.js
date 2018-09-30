import React, {Component} from 'react';
import Classnames from 'classnames';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full: false
        }
    }

    render() {
        const {full} = this.state;

        return (
            <span className={Classnames({'fx-full-screen-btn': true, 'full': !full, 'minxum': full })}
                  onClick={this._onClick.bind(this)}></span>
        );
    }

    _onClick() {
        if(this.state.full) {
            this._cancelFullScreen();
        } else {
            this._fullScreen();
        }
        this.setState({full: !this.state.full});
    }

    _fullScreen() {// 窗口全屏设置
        const el = document.documentElement;
        const rfs = el.requestFullScreen || el.webkitRequestFullScreen ||
                    el.mozRequestFullScreen || el.msRequestFullScreen;

        if(typeof rfs != "undefined" && rfs) {
            rfs.call(el);
        } else if(typeof window.ActiveXObject != "undefined") {
            //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
            var wscript = new ActiveXObject("WScript.Shell");

            if(wscript != null) {
                wscript.SendKeys("{F11}");
            }
        }
    }

    _cancelFullScreen() {// 窗口最小化设置
        var el = document;
        var cfs = el.cancelFullScreen || el.webkitCancelFullScreen ||
                  el.mozCancelFullScreen || el.exitFullScreen;

        if(typeof cfs != "undefined" && cfs) {
            cfs.call(el);
        } else if(typeof window.ActiveXObject != "undefined") {
            //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
            var wscript = new ActiveXObject("WScript.Shell");

            if(wscript != null) {
                wscript.SendKeys("{F11}");
            }
        }
    }
}

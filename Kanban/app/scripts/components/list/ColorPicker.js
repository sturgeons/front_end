import React, {Component} from 'react';
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color';

/**
 * 颜色选择工具
 */
export default class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            color: props.defaultColor
        }
    }

    render() {
        // 颜色选择器的样式
        const styles = reactCSS({
            'default': {
                color: {
                    width: '20px',
                    height: '20px',
                    borderRadius: '2px',
                    background: `${ this.state.color}`
                },
                swatch: {
                    padding: '2px',
                    background: 'lightGray',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                    margin: '7px 0'
                },
                popover: {
                    position: 'absolute',
                    zIndex: '1860'
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px'
                }
            }
        })

        return (
            <div>
                <div style={ styles.swatch } onClick={ this._handleClick.bind(this) }>
                    <div style={ styles.color } />
                </div>
                {
                    this.state.displayColorPicker ? <div style={ styles.popover }>
                        <div style={ styles.cover } onClick={ this._handleClose.bind(this) } />
                        <ChromePicker color={ this.state.color } onChange={ this._handleChange.bind(this) } />
                    </div> : null
                }
            </div>
        );
    }

    // 控制颜色选择的器的显示状态
    _handleClick() {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    // 关闭颜色选择器
    _handleClose() {
        this.setState({ displayColorPicker: false })
    }

    // 记录已选择的颜色值(16进制码)
    _handleChange(color) {
        this.setState({ color: color.hex });
        this.props.onChange(color.hex);
    }
}

import React, {Component} from 'react';
import {Carousel} from 'react-responsive-carousel';

/**
 * 轮播窗体
 */
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showArrows: false,// 不显示左右两边的控制按钮
            showStatus: false,// 不显示状态信息
            showIndicators: false,// 不显示轮播图下面的小点
            showThumbs: false,// 不显示预览
            infiniteLoop: true,// 循环播放
            autoPlay: true,// 自动播放
            interval: 6000// 轮播时间
        }
    }

    render() {
        return (
            <Carousel {...this.state}>
                {this.props.children}
            </Carousel>
        )
    }
}

import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Items from './items.js';

class Comp extends Component {
    render() {
        const content = (() =>{
            const diveded = 3;// 以3条记录为一组进行数据分割
            const datas = this.props.datas;
            let begin = 0;// 起始位置
            let components = [];
            // 创建数据表
            while(datas.length > begin) {
                // 这个是拆分一列的数据信息
                components.push(datas.slice(begin, begin += diveded));
            }
            let odd = this.props.odd;

            return components.length ? components.map(comp =>
                <Row key={Math.random()} style={
                    {
                        fontSize: '16pt',
                        margin: '10px 2px'
                    }
                }>
                    <Items datas={{comp}} odd={ odd = !odd}/>
                </Row>
            ) : (<em>未找到该总成的库存信息</em>);
        })();

        return (
            <div> {content} </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect((state, ownProps) => ({
    datas: ownProps.datas,
    odd: ownProps.odd
}), mapDispatchToProps)(Comp);

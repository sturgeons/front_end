import React, {Component} from 'react';
import merge from 'lodash/merge';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Line,
    Legend,
    Tooltip,
    CartesianGrid,
    ComposedChart,
    ResponsiveContainer
} from 'recharts';

class Comp extends Component {
    render() {
        let index = 0;
        const { height, margin } = this.props;
        const { datas, keys } = this.props.produce;
        const xtick = { stroke: 'white', strokeWidth: 1 };
        const ytick = { stroke: 'white', strokeWidth: 1 };
        const items = keys.length ? keys.map(key => {
           try {
               return (
                   <Bar dataKey={key}
                        stackId="_index"
                        fill={index === 0 ? '#00bc58' : "#" + (888488 + index * 1024)}
                        key={key}
                        fillOpacity={3}
                        legendType={key != ' ' ? 'rect' : 'none'}/>
                )
           } finally {
               if(key != ' ') {index++;}
           }
       }) : [];

        return (
            <ResponsiveContainer height={height}>
                <ComposedChart data={datas} margin={margin}>
        		    <XAxis dataKey="name" tick={xtick}/>
        		    <YAxis tick={ytick}/>
                    <Tooltip/>
        		    <Legend layout="vertical" align='left' verticalAlign='top' width={165}/>
                    {items}
                    <Line type="monotone"
                          dataKey={"目标(Target)"}
                          dot={{ stroke: '#3995de', strokeWidth: 10 }}
                          stroke="#3995de"
                          strokeWidth={3}
                          legendType='circle'/>
        		</ComposedChart>
            </ResponsiveContainer>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return merge(
        {
            produce: state.ActualDataReducer.produce
        },
        ...ownProps
    );
};

export default connect(
    mapStateToProps
)(Comp);

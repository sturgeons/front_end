import React from 'react';
import LastPartLoader from './LastPartLoader';
import PlanLoader from './PlanLoader';
import WorkDataLoader from './WorkDataLoader';
import ShiftLoader from './ShiftLoader';
import ProduceLoader from './ProduceLoader';
import ValidTimeLoader from './ValidTimeLoader';
import OEELoader from './OEELoader';
import OPLoader from './OPLoader';
import ActualDataLoader from './ActualDataLoader';
import DownTimeLoader from './DownTimeLoader';
import ShiftDataLoader from './ShiftDataLoader';
import OPDataLoader from './OPDataLoader';
import DownMinuteLoader from './DownMinuteLoader';
import WorkMinuteLoader from './WorkMinuteLoader';
import AutoRefresh from './AutoRefresh';
import STOeeDataLoader from './STOeeDataLoader';

export default () => {
    return (
        <div>
            <LastPartLoader/>
            <PlanLoader/>
            <WorkDataLoader/>
            <ShiftLoader/>
            <OPLoader/>
            <ProduceLoader/>
            <ValidTimeLoader/>
            <OEELoader/>
            <ActualDataLoader/>
            <DownTimeLoader/>
            <ShiftDataLoader/>
            <OPDataLoader/>
            <DownMinuteLoader/>
            <STOeeDataLoader/>
            <WorkMinuteLoader/>

            <AutoRefresh/>
        </div>
    )
}

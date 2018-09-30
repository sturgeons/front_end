import React from 'react';
import DataLoader from './DataLoader';
import PartLineLoader from './PartLineLoader';
import AutoRefresh from './AutoRefresh';

export default () => {
    return (
        <div>
            <DataLoader/>
            <PartLineLoader/>

            <AutoRefresh/>
        </div>
    )
}

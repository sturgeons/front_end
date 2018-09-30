import React from 'react';
import DataLoader from './DataLoader';
import AutoRefresh from './AutoRefresh';

export default () => {
    return (
        <div>
            <DataLoader/>
            <AutoRefresh/>
        </div>
    )
}

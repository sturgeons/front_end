import React from 'react';
import PartLoader from './PartLoader';
import StoreLoader from './StoreLoader';
import AutoRefresh from './AutoRefresh';

export default () => {
    return (
        <div>
            <PartLoader/>
            <StoreLoader/>
            <AutoRefresh/>
        </div>
    )
}

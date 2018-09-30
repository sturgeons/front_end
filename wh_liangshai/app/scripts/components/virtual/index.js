import React from 'react';
import UnitLoader from './UnitLoader';
import PartLoader from './PartLoader';
import StoreLoader from './StoreLoader';
import STinstoreLoader from './STinstoreLoader';
import SToutstoreLoader from './SToutstoreLoader';
import AutoRefresh from './AutoRefresh';

export default () => {
    return (
        <div>
            <UnitLoader/>
            <PartLoader/>
            <StoreLoader/>
            <SToutstoreLoader/>
            <AutoRefresh/>
        </div>
    )
}

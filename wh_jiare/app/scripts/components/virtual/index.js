import React from 'react';
import PartLoader from './PartLoader';
import StoreLoader from './StoreLoader';
import STinstoreLoader from './STinstoreLoader';
import SToutstoreLoader from './SToutstoreLoader';
import AutoRefresh from './AutoRefresh';

export default () => {
    return (
        <div>
            <PartLoader/>
            <StoreLoader/>
            <STinstoreLoader/>
            <SToutstoreLoader/>
            <AutoRefresh/>
        </div>
    )
}

import React from 'react';
import PartLoader from './PartLoader';
import SToutstoreLoader from './SToutstoreLoader';
import STdatas from './STdatas';
import AutoRefresh from './AutoRefresh';

export default () => {
    return (
        <div>
            <PartLoader/>
            <SToutstoreLoader/>
            <STdatas/>
            <AutoRefresh/>
        </div>
    )
}

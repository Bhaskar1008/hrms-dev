import React from 'react';
import ServiceCorner from './ServiceCorner';
import ServiceCornerSelf from './ServiceSelf';
import ServiceCornerCustomers from './ServiceCustomer';

const ServiceCornerAll = (props) => {
    if(props.tabid === 'allservicecorners'){
        return <ServiceCorner></ServiceCorner>
    }
    else if (props.tabid === 'forself'){
        return <ServiceCornerSelf></ServiceCornerSelf>
    }
    else if (props.tabid === 'forcustomers'){
        return <ServiceCornerCustomers></ServiceCornerCustomers>
    }
    else {
        return <ServiceCorner></ServiceCorner>
    }
}
export default  ServiceCornerAll;
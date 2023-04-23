import React from 'react';

import { Link, useParams } from 'react-router-dom';
import useServicesDetail from '../../Hooks/useServiceDetails';

const ServiceDetail = () => {

    const { serviceId } = useParams();
    const [service] = useServicesDetail(serviceId)
    return (
        <div>
            <h2>You Book : {service.name} Service </h2>
            <div className='text-center'>
                <Link to={`/checkout/${serviceId}`}>
                    <button className='btn btn-primary'>Proceed Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetail;
import MainContainer from '@/app/helpers/containers/MainContainer';
import React from 'react';
import OrdersSection from './orders';

const OrdersMainSection = () => {
    return (
        <MainContainer>
            <OrdersSection/>
        </MainContainer>
    );
};

export default OrdersMainSection;
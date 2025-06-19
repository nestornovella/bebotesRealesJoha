import React from 'react';
import DetailSection from './detailSection';
import MainContainer from '@/app/helpers/containers/MainContainer';

const  OrderDetail = async ({params}) => {

    const {orderId} = await params

    console.log(orderId)
    return (
        <MainContainer>
            <DetailSection  id={orderId}/>
        </MainContainer>
    );
};

export default OrderDetail;
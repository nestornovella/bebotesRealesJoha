import React from 'react';
import UpdateProduct from '../../update-product-component/updateProduct';
import MainContainer from '@/app/helpers/containers/MainContainer';

const UpdateMain = async ({params}) => {

    const {id} = await params

    return (
        <MainContainer>
            <UpdateProduct id={id}/>
        </MainContainer>
    );
};

export default UpdateMain;
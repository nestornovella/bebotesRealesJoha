import React from 'react';
import DetailMainSection from './detailMainSection';

const DetailPage = async ({params}) => {

    const {detail} = await params

    
    return (
        <div>
            <DetailMainSection productId={detail}/>
        </div>
    );
};

export default DetailPage;
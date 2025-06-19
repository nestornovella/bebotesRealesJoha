import React from 'react';
import DetailMainSection from './detailMainSection';
import Footer from '../components/footer/footer';

const DetailPage = async ({params}) => {

    const {detail} = await params

    
    return (
        <div>
            <DetailMainSection productId={detail}/>
            <Footer/>
        </div>
    );
};

export default DetailPage;
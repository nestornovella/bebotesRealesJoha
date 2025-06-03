'use client'

import AdminMainSection from '@/app/admin/products/product-components/AdminMainSection.main';
import React, { useEffect } from 'react';
import useMainChargeHook from '../hooks/mainCharge.hook';


const AdminPage = () => {
    
    const { initialCharge } = useMainChargeHook()

    useEffect(()=>{
        initialCharge()
    },[])
    
    return (
        <AdminMainSection/>
    );
};

export default AdminPage;
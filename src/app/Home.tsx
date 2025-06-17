'use client'

import React, { useEffect } from 'react';
import useMainChargeHook from './hooks/mainCharge.hook';
import MainContainer from './helpers/containers/MainContainer';
import MainRender from './components/render/mainRender';
import { useAuthStore } from './store/auth.store';

const Home = () => {

    const { initialCharge } = useMainChargeHook()
    const { removePass } = useAuthStore()

    useEffect(() => {
        initialCharge()
        removePass()
    }, [])

    return (
        <>
            <MainContainer>
                <MainRender />
            </MainContainer>
        </>
    );
};

export default Home;
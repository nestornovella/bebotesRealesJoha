'use client'
import React, { useState } from 'react';

const useToogleOpenHook = () => {
    
    const [status, setStatus] = useState(false)

    function toogleOpen (){
        setStatus(prev => !prev)
    }

    function close(){
        setStatus(false)
    }

    function open(){
        setStatus(false)
    }

    return{
        open,
        close,
        toogleOpen,
        status
    }
};

export default useToogleOpenHook;

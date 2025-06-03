import React, { Children } from 'react';
import Styles from './styleContainer.module.css'

function Transition() {

    return (
        <>
            <div className={Styles.first}>

            </div>
            <div className={Styles.second}>

            </div>
        </>
    )
}

const MainContainer = ({ children, transition = true}) => {
    return (
        <div className={`px-3 md:px-20 xl:px-36 2xl:px-48 py-[90px] h-screen w-screen `}>
            {
                transition &&
                <Transition />
            }
            {children}
        </div>
    );
};

export default MainContainer;
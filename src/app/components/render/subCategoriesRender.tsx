import React from 'react';
import ProductsRender from './productsRender';

const SubCAtegoriesRender = ({subCategory}) => {
    return (
        <div>
            <ProductsRender subCategory={subCategory}/>
        </div>
    );
};

export default SubCAtegoriesRender;
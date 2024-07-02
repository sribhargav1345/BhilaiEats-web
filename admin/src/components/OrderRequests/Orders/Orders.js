import React from 'react';

export default function Order({ order }) {
    return (
        <div className='order'>
            <p>{order.name}</p>
        </div>
    );
}

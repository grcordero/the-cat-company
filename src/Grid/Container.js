import React from 'react';
import Items from './Items';

function Container(props) {
    const columns = Math.floor(12/ props.columns);
    
    return (
        <div className="grid">
            <Items column={columns} items={props.items} />
        </div>
    );
}

export default Container;
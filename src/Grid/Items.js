import React from 'react';
import Row from 'react-bootstrap/Row';
import Item from './Item';

function Items(props) {
    const items = props.items.map((item, index) => <Item column={props.column} item={item} key={index} />);
    
    const contents = (props.items.length === 0) 
        ? <p>No items loaded</p> 
        : <Row>
            {items}
        </Row>;

    return contents;
}

export default Items;
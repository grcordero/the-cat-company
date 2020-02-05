import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function Category(props) {
    const options = props.list.map((category) => 
        <option key={category.id} value={category.id}>{category.name}</option>
    );

    const onChange = (event) =>{
        props.onCategoryChange(event.target.value);
    }

    return (
        <div className="category">
            <Form.Row bsPrefix="row">
                <Form.Group as={Col} lg="6" md="8">
                    <Form.Label>Cat Breed</Form.Label>
                    <Form.Control as="select" className="custom-select" onChange={onChange} value={props.selected}>
                        <option value="">Choose...</option>
                        {options}
                    </Form.Control>
                </Form.Group>
            </Form.Row>
        </div>
    );
}

export default Category;
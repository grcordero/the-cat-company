import React from 'react';
import Card from 'react-bootstrap/Card';
import {Col} from 'react-bootstrap';

import {Link} from 'react-router-dom';

function Item(props) {
    return (
        <Col lg={props.column} md="4" sm={6}>
            <Card className="mb-4">
                <Card.Img variant="top" src={props.item.url} />
                <Card.Body>
                    <Link to={`/${props.item.id}`} className="card-link">Details</Link>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default Item;
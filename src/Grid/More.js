import React from 'react';
import Button from 'react-bootstrap/Button';
import Loading from '../Page/Partials/Loading';

function More(props) {
    const content = (props.loading) 
        ? <Loading />
        : <Button variant="link" id="load-more-cta" onClick={props.onMoreClick}>Load more</Button>;

    return (
        <div className="load-more mb-4 text-center">
            {content}
        </div>
    );
}

export default More;

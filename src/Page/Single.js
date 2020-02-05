import React, { useEffect, useState } from 'react';
import {Container, Image} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Cat from './../API/Cat';

import {Link} from 'react-router-dom';
import Loading from './Partials/Loading';

function Single() {
    let {id} = useParams();

    const [state, setState] = useState({
        image: null,
        object: {},
        loading: true
    });

    useEffect(() => {
        (async () => {
            Cat.get(id)
                .then((response) => {
                    const next = {...state};
                    next.image = response.data.url;
                    next.object = response.data.breeds[0];
                    next.loading = false;
                    setState(next);
                })
        })();
    }, []);

    const style = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    };

    const content = (state.loading) 
        ? <div style={style}><Loading /></div>
        : <Container>
            <p className="mt-3">
                <Link to={{
                    pathname: '/',
                    state: {
                        single: {
                            id: state.object.id
                        }
                    }
                }}>Back</Link>
            </p>

            <div className="mb-4">
                <Image src={state.image} fluid />
            </div>
            <h1>{state.object.name}</h1>
            <h4>Origin: {state.object.origin}</h4>
            <h6>{state.object.temperament}</h6>
            <p className="text-justify">{state.object.description}</p>
        </Container>;

    return (content);
}

export default Single;
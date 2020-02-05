import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';

import Category from './Partials/Category';
import Grid from './../Grid';
import Cat from './../API/Cat';
import {useLocation} from 'react-router-dom';

function Home() {
    const [state, setState] = useState({
		category: {
			list: [],
			selected: ''
		},
		items: [],
		pagination: {
			page: 1,
			limit: 10
		},
		columns: 4,
		loading: {
			more: false,
			category: false
		},
		more: false
    });

    const location = useLocation();
    
    useEffect(() => {    
        (async () => {
			Cat.breeds()
				.then((response) => {
					let next = {...state};
                        next.category.list = [...response.data];
                        next.category.selected = (location.state && location.state.single.id) ? location.state.single.id : '';

                    setState(next);

                    onCategoryChange(state.category.selected);
				});
		})();
    }, []);

	const onCategoryChange = (id) => {
        (async () => {
            let next = {...state};
                next.items = [];
                next.category.selected = id;

            setState(next);

            if (id) {
                Cat.images(id, state.pagination)
                .then((response) => {
                    next = {...state};
                    next.items = [...response.data];
                    
                    if (next.items.length) {
                        next.more = true;
                    }

                    setState(next);
                });
            }
            
        })();
	}
	
	const onMoreClick = () => {
		let next = {...state};
			next.loading.more = true;
		
		setState(next);
		let pagination = {...state.pagination};
			pagination.page++;
		
		(async () => {
			Cat.images(next.category.selected, pagination)
				.then((response) => {
					next = {...state};
					const incoming = response.data.filter((image) => {
						return ! next.items.find((item) => {
							return image.id === item.id
						});
					});

					next.items = next.items.concat(incoming);

					if (incoming.length < state.pagination.limit) {
						next.more = false;
					}

					next.pagination = pagination;
					next.loading.more = false;
					setState(next);
				});
		})();
	}

    return (
        <Container>
            <h1>Cat Browser</h1>
            <Category list={state.category.list} onCategoryChange={onCategoryChange} selected={(state.category.selected && state.category.selected)} />
            <Grid.Container columns={state.columns} items={state.items} />
            {state.more ?
                <Grid.More onMoreClick={onMoreClick} loading={state.loading.more} />
                : ''
            }
        </Container>
    );
}

export default Home;
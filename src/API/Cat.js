import axios from 'axios';

function Cat() {
    const instance = axios.create({
        baseURL: 'https://api.thecatapi.com/v1/',
        headers: {
            'x-api-key': '988e8b7f-2a11-4274-a0d6-7da3ac097b06'
        }
    });

    const key = 'api.cat:';

    const expiration = 10;

    this.breeds = () => {
        const endpoint = instance.getUri({
            url: '/images/search'
        });

        let data = JSON.parse(
            window.localStorage.getItem(key + endpoint)
        );
        
        let fetch = ! (data && data.expires > Date.now());
        
        if (fetch) {
            let promise = instance.get('breeds');

            promise.then((response) => {
                let date = new Date();
                    date.setMinutes(date.getMinutes() + expiration);

                let store = {
                    expires: date.getTime(),
                    response: response
                };

                window.localStorage.setItem(key + endpoint, JSON.stringify(store));
            });

            return promise;

        } else {
            return new Promise(function(resolve) {
                setTimeout(() => resolve(data.response));
            });
        }
    }

    this.images = (breed, pagination) => {
        const endpoint = instance.getUri({
            url: '/images/search',
            params: {
                breed_id: breed,
                page: pagination.page,
                limit: pagination.limit
            }
        });

        let data = JSON.parse(
            window.localStorage.getItem(key + endpoint)
        );
        
        let fetch = ! (data && data.expires > Date.now());

        if (fetch) {
            let promise = instance.get('images/search', {
                params: {
                    breed_id: breed,
                    page: pagination.page,
                    limit: pagination.limit
                }
            });

            promise.then((response) => {
                let date = new Date();
                    date.setMinutes(date.getMinutes() + expiration);

                let store = {
                    expires: date.getTime(),
                    response: response
                };

                window.localStorage.setItem(key + endpoint, JSON.stringify(store));
            });

            return promise;

        } else {
            return new Promise(function(resolve) {
                setTimeout(() => resolve(data.response));
            });
        }
    }

    this.get = (id) => {
        const url = `/images/${id}`;

        const endpoint = instance.getUri({
            url: url
        });
        
        let data = JSON.parse(
            window.localStorage.getItem(key + endpoint)
        );
        
        let fetch = ! (data && data.expires > Date.now());

        if (fetch) {
            let promise = instance.get(url);

            promise.then((response) => {
                let date = new Date();
                    date.setMinutes(date.getMinutes() + expiration);

                let store = {
                    expires: date.getTime(),
                    response: response
                };

                window.localStorage.setItem(key + endpoint, JSON.stringify(store));
            });

            return promise;
        } else {
            return new Promise(function(resolve) {
                setTimeout(() => resolve(data.response));
            });
        }
    }
}

export default new Cat();
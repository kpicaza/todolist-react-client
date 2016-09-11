import localStorage from 'localStorage';
import FormDataFactory from './FormDataFactory';

export default class RestClient {

    constructor() {
        // this.factory = new FormDataFactory;
    }

    /**
     * Make request to Rest Client.
     *
     * @param path
     * @param method
     * @param formData
     * @returns {*}
     */
    request(path, method, formData) {

        let config = {
            method: method,
            headers: new Headers()
        };

        if ('GET' !== method) {
            config.body = JSON.stringify(formData);
        }

        let token = localStorage.getItem('token');

        if (token) {
            config.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        }


        config.headers.append('Content-Type', 'application/json');
        config.headers.append('Origin', '*');

        console.log(config);
        return fetch(path, config);
    }

    getResponse(request, successCallback, errorCallback, dataCallback) {

        dataCallback = dataCallback || function () {};

        request
            .then(successCallback)
            .then(dataCallback)
            .catch(errorCallback)
        ;
    }
}

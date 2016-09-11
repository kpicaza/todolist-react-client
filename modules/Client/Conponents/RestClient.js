import localStorage from 'localStorage';

export default class RestClient {

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

        return fetch(path, config);
    }

    /**
     *
     * @param request
     * @param successCallback
     * @param errorCallback
     * @param dataCallback
     */
    getResponse(request, successCallback, errorCallback, dataCallback) {
        dataCallback = dataCallback || function () {};

        request
            .then(successCallback)
            .then(dataCallback)
            .catch(errorCallback)
        ;
    }
}

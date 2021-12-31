const axios = require('axios');

class HttpRequest {
    async getRequest({ url, headers, ...options }) {
        const response = await axios.get(url, { headers: {
            ...headers,
            'Content-Type': 'application/json'
        } });

        return response.data;
    }
}


module.exports = new HttpRequest()
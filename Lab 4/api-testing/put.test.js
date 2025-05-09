const axios = require('axios');

describe('PUT /put', () => {
    let response;
    const updateData = { id: 5, status: 'active' };

    beforeEach(async () => {
        response = await axios.put('https://httpbin.org/put', updateData);
    }, 15000);

    test('should return status 200', () => {
        expect(response.status).toBe(200);
    });

    test('should return the updated data in json field', () => {
        expect(response.data.json).toEqual(updateData);
    });

    test('should return URL matching request', () => {
        expect(response.data.url).toBe('https://httpbin.org/put');
    });

    test('should use PUT method', () => {
        expect(response.data.method || response.config.method.toUpperCase()).toBe('PUT');
    });

    test('should return headers object', () => {
        expect(response.data.headers).toBeDefined();
    });
});

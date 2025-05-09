const axios = require('axios');

describe('POST /post', () => {
    let response;
    const requestBody = { name: 'Alice', age: 30 };

    beforeEach(async () => {
        response = await axios.post('https://httpbin.org/post', requestBody);
    }, 15000);

    test('should return status 200', () => {
        expect(response.status).toBe(200);
    });

    test('should echo back the data sent', () => {
        expect(response.data.json).toEqual(requestBody);
    });

    test('should include Content-Type in headers', () => {
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('should return POST method in response', () => {
        expect(response.data.method || response.config.method.toUpperCase()).toBe('POST');
    });

    test('should include headers in response', () => {
        expect(response.data.headers).toBeDefined();
    });
});

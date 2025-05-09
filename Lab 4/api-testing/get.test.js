const axios = require('axios');

describe('GET /get', () => {
    let response;

    beforeEach(async () => {
        response = await axios.get('https://httpbin.org/get');
    }, 15000);

    test('should return status 200', () => {
        expect(response.status).toBe(200);
    });

    test('should return status text OK', () => {
        expect(response.statusText).toBe('OK');
    });

    test('should return JSON response', () => {
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('should have defined "url" in body', () => {
        expect(response.data.url).toBeDefined();
    });

    test('should return URL matching request', () => {
        expect(response.data.url).toBe('https://httpbin.org/get');
    });
});

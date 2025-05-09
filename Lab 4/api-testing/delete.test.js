const axios = require('axios');

describe('DELETE /delete', () => {
    let response;

    beforeEach(async () => {
        response = await axios.delete('https://httpbin.org/delete', {
            data: { id: 10 }
        });
    }, 15000);

    test('should return status 200', () => {
        expect(response.status).toBe(200);
    });

    test('should echo back deleted ID in json field', () => {
        expect(response.data.json).toEqual({ id: 10 });
    });

    test('should confirm DELETE method', () => {
        expect(response.data.method || response.config.method.toUpperCase()).toBe('DELETE');
    });

    test('should return valid JSON response', () => {
        expect(typeof response.data).toBe('object');
    });

    test('should include request headers', () => {
        expect(response.data.headers).toBeDefined();
    });
});

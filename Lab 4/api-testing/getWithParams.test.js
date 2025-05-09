const axios = require('axios');

describe('GET /get?id=123', () => {
    let response;

    beforeEach(async () => {
        response = await axios.get('https://httpbin.org/get', {
            params: { id: 123 }
        });
    }, 15000);

    test('should return status 200', () => {
        expect(response.status).toBe(200);
    });

    test('should include query param id=123', () => {
        expect(response.data.args.id).toBe('123');
    });

    test('should return echoed query object', () => {
        expect(typeof response.data.args).toBe('object');
    });

    test('should return full URL with query', () => {
        expect(response.data.url).toBe('https://httpbin.org/get?id=123');
    });

    test('should not contain unexpected fields in args', () => {
        expect(Object.keys(response.data.args)).toEqual(['id']);
    });
});

const axios = require('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('API Tests - JSONPlaceholder', () => {

  test('GET /posts should return 100 posts', async () => {
    const response = await axios.get(`${BASE_URL}/posts`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBe(100);
  });

  test('GET /posts/1 should return a valid post', async () => {
    const response = await axios.get(`${BASE_URL}/posts/1`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', 1);
    expect(response.data).toHaveProperty('title');
  });

  test('POST /posts should return a created post with ID', async () => {
    const payload = { title: 'foo', body: 'bar', userId: 1 };
    const response = await axios.post(`${BASE_URL}/posts`, payload);
    expect(response.status).toBe(201);
    expect(response.data).toMatchObject(payload);
    expect(response.data).toHaveProperty('id');
  });

  test('PUT /posts/1 should update a post', async () => {
    const updateData = { id: 1, title: 'updated', body: 'updated', userId: 1 };
    const response = await axios.put(`${BASE_URL}/posts/1`, updateData);
    expect(response.status).toBe(200);
    expect(response.data).toMatchObject(updateData);
  });

  test('DELETE /posts/1 should return 200 status', async () => {
    const response = await axios.delete(`${BASE_URL}/posts/1`);
    expect(response.status).toBe(200);
  });
});
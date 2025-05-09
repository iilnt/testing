const axios = require('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const apiClient = {
  getPosts: async () => {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data;
  },

  getPostById: async (id) => {
    const response = await axios.get(`${BASE_URL}/posts/${id}`);
    return response.data;
  },

  createPost: async (postData) => {
    const response = await axios.post(`${BASE_URL}/posts`, postData);
    return response.data;
  },

  updatePost: async (id, postData) => {
    const response = await axios.put(`${BASE_URL}/posts/${id}`, postData);
    return response.data;
  },

  deletePost: async (id) => {
    const response = await axios.delete(`${BASE_URL}/posts/${id}`);
    return response.status === 200;
  }
};

module.exports = apiClient;
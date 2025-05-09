const axios = require('axios');
const apiClient = require('../data/apiClient');

jest.mock('axios');

describe('apiClient Unit Tests', () => {
  it('should fetch all posts', async () => {
    const mockData = [{ id: 1, title: 'Post 1' }];
    axios.get.mockResolvedValue({ data: mockData });

    const result = await apiClient.getPosts();
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
  });

  it('should fetch a post by ID', async () => {
    const mockData = { id: 1, title: 'Post 1' };
    axios.get.mockResolvedValue({ data: mockData });

    const result = await apiClient.getPostById(1);
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
  });

  it('should create a post', async () => {
    const postData = { title: 'New Post' };
    const mockResponse = { id: 101, ...postData };
    axios.post.mockResolvedValue({ data: mockResponse });

    const result = await apiClient.createPost(postData);
    expect(result).toEqual(mockResponse);
    expect(axios.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', postData);
  });

  it('should update a post', async () => {
    const updatedData = { title: 'Updated Title' };
    const mockResponse = { id: 1, ...updatedData };
    axios.put.mockResolvedValue({ data: mockResponse });

    const result = await apiClient.updatePost(1, updatedData);
    expect(result).toEqual(mockResponse);
    expect(axios.put).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1', updatedData);
  });

  it('should delete a post', async () => {
    axios.delete.mockResolvedValue({ status: 200 });

    const result = await apiClient.deletePost(1);
    expect(result).toBe(true);
    expect(axios.delete).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
  });
});
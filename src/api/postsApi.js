import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getPostList = async () => {
  const res = await api.get('/posts');
  return res.data;
};

export const getPostById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

export const getCommentsByPostId = async (postId) => {
  const res = await api.get(`/posts/${postId}/comments`);
  return res.data;
};

export const getUsers = async () => {
  const res = await api.get('/users');
  return res.data;
};

export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};
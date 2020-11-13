import axios from 'axios';

const postUrl = 'http://localhost:5000/posts';

//posts
export const fetchPosts = () => axios.get(postUrl);
export const createPost = (newPost) => axios.post(postUrl, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${postUrl}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${postUrl}/${id}`);
export const likePost = (id) => axios.patch(`${postUrl}/${id}/likePost`);
export const fetchPost = (id) => axios.get(`${postUrl}/${id}`);

//users
const userUrl = 'http://localhost:5000/user';
export const getUser = (body, config) =>
  axios.post(`${userUrl}/login`, body, config);

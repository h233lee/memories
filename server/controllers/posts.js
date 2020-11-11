import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getPost = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const postMessage = await PostMessage.findById(id);
//     res.status(200).json(postMessage);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that ID');
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { ...post, id },
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that ID');
  }

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No post with that ID');
  }

  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    {
      likeCount: post.likeCount + 1,
    },
    { new: true }
  );

  res.json(updatedPost);
};

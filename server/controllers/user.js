import User from '../models/User.js';
import mongoose from 'mongoose';

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No user with that ID');
  }

  await User.findByIdAndRemove(id);
  res.json({ message: 'User successfully deleted' });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No user with that ID');
  }

  const updatedPost = await User.findByIdAndUpdate(
    id,
    { ...user, id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

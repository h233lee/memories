import User from '../models/User.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user already exists
    let user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email: email.toLowerCase(),
      password,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: 'Invalid Credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    res.json(user);
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

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const updatedPost = await User.findByIdAndUpdate(
    id,
    { ...user, id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

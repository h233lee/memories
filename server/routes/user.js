import express from 'express';

import {
  createUser,
  getUser,
  deleteUser,
  updateUser,
} from '../controllers/user.js';

const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

export default router;

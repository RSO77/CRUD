import { Router } from "express";
import UserController from './UserController.js';

const router = new Router();

router.post('/user', UserController.create)
router.get('/users', UserController.getAll)
router.get('/users/:id', UserController.getOne)
router.put('/user', UserController.update)
router.delete('/user/:id', UserController.delete)

router.post('/knock-on-friends', UserController.knockOnFriends)
router.get('/users-friends', UserController.showFriends)
router.get('/wish-list', UserController.wishList)
router.put('/user-add/:id', UserController.addUser)
router.delete('/user-delete/:id', UserController.delete)


export default router;
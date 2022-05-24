import { Router } from "express";
import UserController from './UserController.js';

const router = new Router();

router.post('/users', UserController.create)
router.get('/users', UserController.getAll)
router.get('/users/:id', UserController.getOne)
router.put('/users', UserController.update)
router.delete('/users/:id', UserController.delete)

router.put('/users/add/:userId/:newUserId', UserController.addUserFriends)
router.put('/users/accept/:userId/:newUserId', UserController.userAcceptFriend)
router.put('/users/remove/:userId/:newUserId', UserController.removeUserFriends)
router.get('/users/showFriends/:userId', UserController.showFriends)
router.get('/users/showRequest/:userId', UserController.showUserRequest)


export default router;
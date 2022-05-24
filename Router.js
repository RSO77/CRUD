import { Router } from "express";
import UserController from './UserController.js';

const router = new Router();

router.post('/user', UserController.create)
router.get('/users', UserController.getAll)
router.get('/user/:id', UserController.getOne)
router.put('/user', UserController.update)
router.delete('/user/:id', UserController.delete)

router.put('/user/add/:userId/:newUserId', UserController.addUserFriends)
router.put('/user/accept/:userId/:newUserId', UserController.userAcceptFriend)
router.put('/user/remove/:userId/:newUserId', UserController.removeUserFriends)
router.get('/users/showFriends/:userId', UserController.showFriends)
router.get('/users/showRequest/:userId', UserController.showUserRequest)


export default router;
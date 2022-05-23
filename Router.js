import { Router } from "express";
import UserController from './UserController.js';

const router = new Router();

router.post('/user', UserController.create)
router.get('/users', UserController.getAll)
router.get('/user/:id', UserController.getOne)
router.put('/user', UserController.update)
router.delete('/user/:id', UserController.delete)

router.put('/user/:id', UserController.requestUserFriend)
router.put('/user/:id1/:id2', UserController.addUserFrends)
router.put('/userRemoveFriends/:id1/:id2', UserController.removeUserFriends)
router.get('/userShowFriends/:id', UserController.showFriends)
router.get('/usersShowRequest/:id', UserController.showUserRequest)


export default router;
import { Router } from "express";
import UserController from './UserController.js';

const router = new Router();

router.post('/user', UserController.create)
router.get('/users', UserController.getAll)
router.get('/user/:id', UserController.getOne)
router.put('/user', UserController.update)
router.delete('/user/:id', UserController.delete)

router.put('/user/:id', UserController.knockOnFriends)
router.put('/user/:id1/:id2', UserController.addUser)
router.put('/userd/:id1/:id2', UserController.deleteUser)
router.get('/users-f/:id', UserController.showFriends)
router.get('/users-r/:id', UserController.listRequest)

// router.post('/knock-on-friends', UserController.knockOnFriends)


export default router;
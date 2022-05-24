import { type } from "os";
import User from "./User.js";

class UserController {
  async create(req, res) {
    try {
      const { name, age, sex, flag } = req.body;
      const user = await User.create({ name, age, sex, flag });
      res.json(user);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getAll(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Укажите id!" });
      }
      const user = await User.findById(id);
      return res.json(user);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async update(req, res) {
    try {
      const user = req.body;
      if (!user._id) {
        res.status(400).json({ message: "Укажите id!" });
      }
      const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
      return res.json(updatedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Укажите id!" });
      }
      const user = await User.findByIdAndDelete(id);
      return res.json(user);
    } catch (e) {
      res.status(500).json(e);
    }
  }



  async addUserFriends(req, res) {
    try {
      const { userId, newUserId } = req.params;
      if (!userId && newUserId && (userId != newUserId)) {
        res.status(400).json({ message: "Укажите id!" });
      }

      const user = await User.findById(userId);
      if (user.requestId.includes(newUserId)) {
        res.status(400).json({ message: "Вы уже подали заявку" });
      }else if (user.friendIds.includes(newUserId)) {
        res.status(400).json({ message: "Вы уже в друзьях" });
      }

      user.requestId.push(newUserId);
      const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
      return res.json(updatedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async userAcceptFriend(req, res) {
    try {
      const { userId, newUserId } = req.params;
      if (!userId && !newUserId && (userId != newUserId)) {
        res.status(400).json({ message: "Укажите id!" });
      }
      const user = await User.findById(userId);
      if (user.friendIds.includes(newUserId)) {
        res.status(400).json({ message: "Вы уже в друзьях" });
      }
      user.friendIds.push(newUserId);
      user.requestId.splice(user.requestId.indexOf(newUserId), 1)
      
      const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
      return res.json(updatedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async removeUserFriends(req, res) {
    try {
      const { userId, newUserId } = req.params;
      if (!userId && !newUserId) {
        res.status(400).json({ message: "Укажите id!" });
      }
      const user = await User.findById(userId);
      if(user.requestId.includes(newUserId)){
        user.requestId.splice(user.requestId.indexOf(newUserId), 1)
      }
      if(user.friendIds.includes(newUserId)){
        user.friendIds.splice(user.friendIds.indexOf(newUserId), 1)
      }
      const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
      return res.json(user);
    } catch (e) {
        res.status(500).json(e);
    }
  }

  async showFriends(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      return res.json(user.friendIds);
      } catch (e) {
        res.status(500).json(e);
      }
  }

  async showUserRequest(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      return res.json(user.requestId);
      } catch (e) {
        res.status(500).json(e);
      }
  }

}

export default new UserController();

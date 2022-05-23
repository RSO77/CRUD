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



  async requestUserFriend(req, res) {
    try {
      const { id } = req.params;
      const { _id } = req.body;
      if (!id && _id2 && (id1 != id2)) {
        res.status(400).json({ message: "Укажите id!" });
      }

      const user = await User.findById(id);
      if (user.requestId.includes(_id)) {
        res.status(400).json({ message: "Вы уже подали заявку" });
      }else if (user.friendIds.includes(_id)) {
        res.status(400).json({ message: "Вы уже в друзьях" });
      }

      user.requestId.push(_id);
      const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
      return res.json(updatedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async addUserFrends(req, res) {
    try {
      const { id1, id2 } = req.params;
      if (!id1 && !id2 && (id1 != id2)) {
        res.status(400).json({ message: "Укажите id!" });
      }
      const user = await User.findById(id1);
      if (user.friendIds.includes(id2)) {
        res.status(400).json({ message: "Вы уже в друзьях" });
      }
      user.friendIds.push(id2);
      user.requestId.splice(user.requestId.indexOf(id2), 1)
      
      const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
      return res.json(updatedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async removeUserFriends(req, res) {
    try {
      const { id1, id2 } = req.params;
      if (!id1 && !id2) {
        res.status(400).json({ message: "Укажите id!" });
      }
      const user = await User.findById(id1);
      if(user.requestId.includes(id2)){
        user.requestId.splice(user.requestId.indexOf(id2), 1)
      }
      if(user.friendIds.includes(id2)){
        user.friendIds.splice(user.friendIds.indexOf(id2), 1)
      }
      const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
      return res.json(user);
    } catch (e) {
        res.status(500).json(e);
    }
  }

  async showFriends(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      return res.json(user.friendIds);
      } catch (e) {
        res.status(500).json(e);
      }
  }

  async showUserRequest(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      return res.json(user.requestId);
      } catch (e) {
        res.status(500).json(e);
      }
  }

}

export default new UserController();

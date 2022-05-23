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



  async knockOnFriends(req, res) {
    try {
      const { id } = req.params;
      const { _id } = req.body;
      if (!id && _id2 && (id1 != id2)) {
        res.status(400).json({ message: "Укажите id!" });
      }

      const user = await User.findById(id);
      if (user.request_id.includes(_id)) {
        res.status(400).json({ message: "Вы уже подали заявку" });
      }else if (user.friends_id.includes(_id)) {
        res.status(400).json({ message: "Вы уже в друзьях" });
      }

      user.request_id.push(_id);
      const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
      return res.json(updatedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async addUser(req, res) {
    try {
      const { id1, id2 } = req.params;
      if (!id1 && !id2 && (id1 != id2)) {
        res.status(400).json({ message: "Укажите id!" });
      }
      const user = await User.findById(id1);
      if (user.friends_id.includes(id2)) {
        res.status(400).json({ message: "Вы уже в друзьях" });
      }
      user.friends_id.push(id2);
      user.request_id.splice(user.request_id.indexOf(id2), 1)
      
      const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
      return res.json(updatedUser);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id1, id2 } = req.params;
      if (!id1 && !id2) {
        res.status(400).json({ message: "Укажите id!" });
      }
      const user = await User.findById(id1);
      if(user.request_id.includes(id2)){
        user.request_id.splice(user.request_id.indexOf(id2), 1)
      }
      if(user.friends_id.includes(id2)){
        user.friends_id.splice(user.friends_id.indexOf(id2), 1)
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
      return res.json(user.friends_id);
      } catch (e) {
        res.status(500).json(e);
      }
  }

  async listRequest(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      return res.json(user.request_id);
      } catch (e) {
        res.status(500).json(e);
      }
  }

}

export default new UserController();

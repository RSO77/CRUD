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
      const { name, age, sex } = req.body;
      const user = await User.create({ name, age, sex, flag: 'not-approv'});
      res.json(user);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async showFriends(req, res) {
    try {
        const users = await User.find();
        const user = users.filter(item => item.flag == 'approv');
        return res.json(user);
      } catch (e) {
        res.status(500).json(e);
      }
  }

  async wishList(req, res) {
    try {
        const users = await User.find();
        const user = users.filter(item => item.flag == 'not-approv');
        return res.json(user);
      } catch (e) {
        res.status(500).json(e);
      }
  }

  async addUser(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
          res.status(400).json({ message: "Укажите id!" });
        }
        const user = await User.findById(id);
        user.flag = 'approv';
        return res.json(user);
      } catch (e) {
        res.status(500).json(e);
      }
  }
}

export default new UserController();

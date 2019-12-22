const express = require("express");
const router = express.Router();

const db = require("../models");
const Todo = db.Todo;
const User = db.User;

const { authenticated } = require("../config/auth");

router.get("/", authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error("user not found");

      return Todo.findAll({
        where: { UserId: req.user.id }
      });
    })
    .then(todos => res.render("index", { todos }))
    .catch(error => res.status(422).json(error));
});

module.exports = router;

const express = require('express')

const { create, getAllUsers, getUserById, update, deleteUser } = require('../controller/userController')

const router = express.Router();

router.post('/user', create);
router.get('/users', getAllUsers);
router.get("/users/:id", getUserById);
router.put("/update/user/:id", update);
router.delete("/delete/user/:id", deleteUser );

module.exports = router;
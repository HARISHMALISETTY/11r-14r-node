const express=require("express");
const router = express.Router();
const userController=require("../controllers/userController.js")

router.get("/users",userController.getUsers);
router.post("/signUp",userController.signUp);
router.post("/login",userController.login);
router.put("/users/:id",userController.updateUser);
router.delete("/users/:id",userController.deleteUser);

module.exports = router;
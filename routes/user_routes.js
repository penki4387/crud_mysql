import userControllers from "../controllers/user_controllers.js";
import express from "express";

const userRoutes = express.Router()

userRoutes.route("/user")
.post(userControllers.prototype.createUser)
.get(userControllers.prototype.getAllUsers)
userRoutes.route("/user/update/:id").put(userControllers.prototype.updateUser)
userRoutes.route("/user/delete/:id").delete(userControllers.prototype.deleteUser)
userRoutes.route("/user/one/:id").get(userControllers.prototype.getUserById)
userRoutes.route("/user/login")
.post(userControllers.prototype.loginUser)

export default userRoutes;

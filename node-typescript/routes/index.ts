import express from "express";
import UserController from "../controllers/user_controller";
const router = express.Router();

/* GET home page. */
router.get("/", UserController.getAllUsers);

export default router;

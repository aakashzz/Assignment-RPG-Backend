import { Router } from "express";
import { addUserController, showUserController } from "../controllers/join.controller.js";

const router = Router();

router.route("/addUser").post(addUserController)
router.route("/showUser").get(showUserController)

export default router
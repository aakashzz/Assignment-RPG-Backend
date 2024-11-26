import { Router } from "express";

const router = Router();

router.route("/addUser").post();
router.route("/showUser").get();
router.route("/deleteUser").delete();

export default router;
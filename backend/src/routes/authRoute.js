import express from "express";
const router = express.Router();
 import {check, login, logout , signup, update} from "../controllers/authController.js"
import { protectRoute } from "../middleware/authenticate.js";

router.post("/signup", signup)



router.post("/login" , login)


router.post("/logout" , logout)


router.put("/update" ,protectRoute,  update)


router.get("/check" , protectRoute , check)

export default router;
 
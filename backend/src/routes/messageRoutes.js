import express from "express";
import { protectRoute } from "../middleware/authenticate.js";
import { getMessages , getUsersForSidebar , sendMessage } from "../controllers/messageControler.js";
const router=express.Router();
 import multer from "multer";
const storage = multer.memoryStorage(); // for direct buffer upload
const upload = multer({ storage });

router.get("/users" ,protectRoute, getUsersForSidebar )

router.get("/:id", protectRoute , getMessages )

router.post("/send/:id", protectRoute, upload.single("image"), sendMessage);

 export default router;
  
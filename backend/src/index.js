// 1) Load env FIRST
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import messageRoutes from "./routes/messageRoutes.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

// 2) Body parsers (only once)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 3) CORS (must come before routes)
app.use(cors({
  origin: ["https://chat-apk-zeta.vercel.app", "http://localhost:5173"],
  credentials: true,
}));

app.use(cookieParser());

// 4) Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// 5) Start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  connectDB();
  console.log("server started port : " + PORT);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import uploadRoutes from "./routes/admin.route.js";
import contactRoutes from "./routes/contact.route.js";
import userRoutes from "./routes/user.route.js";
import stateRoutes from "./routes/states.route.js";
import "./controllers/leetcode.controller.js";
import "./controllers/gfg.controller.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(uploadRoutes);
app.use(contactRoutes);
app.use(userRoutes);
app.use(stateRoutes);

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

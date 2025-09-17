import express from "express";
import cors from "cors";
import { MErrorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.route";
import counterRoutes from "./routes/counter.route";
import { connectRedis } from "./configs/redis.config";

connectRedis();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/counter", counterRoutes);

app.use(MErrorHandler);

app.listen(3000, () => {
  console.log("Server running in http://localhost:3000");
});

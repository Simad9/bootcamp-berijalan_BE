import express from "express";
import cors from "cors";
import { MErrorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.route";

const app = express();
app.use("/api/v1/auth", authRoutes);

app.use(MErrorHandler);

app.listen(3000, () => {
  console.log("Server running in http://localhost:3000");
});

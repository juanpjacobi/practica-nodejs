import express from "express";
import userRoutesHandler from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { AppDataSource } from "./ormconfig";

const app = express();
app.use(express.json());

app.use("/users", userRoutesHandler);

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log("🗄️ Conectado a la base de datos");
    app.listen(3000, () => console.log("🚀 Server on http://localhost:3000"));
  })
  .catch((err) => console.error("Error BD:", err));

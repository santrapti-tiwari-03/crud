import express from "express";
import "dotenv/config";
import "./config/database.js";
import contactRoute from "./routes/contact.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { notFoundMiddlware } from "./middlewares/notfound.middleware.js";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", contactRoute);
app.use(notFoundMiddlware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server on the running PORT http://localhost:${PORT}`);
});

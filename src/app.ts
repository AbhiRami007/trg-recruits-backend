import cors from "cors";
import express from "express";
import helmet from "helmet";

import router from "./routes";

const app = express();

app.use(helmet());
app.set("etag", "strong");

// Express configuration
app.use(cors());

// Internationalization (i18next)

// Middlewares and router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

export default app;

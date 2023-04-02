import http from "http";
import app from "./app";
import { initSocket } from "./utils/socketio.js";
import { CONFIG } from "./config/env";
import models from "./models";
const server = http.createServer(app);

let serverInstance;
// Synchronizing any model changes with database.
models.sequelize
  .sync()
  .then(() => {
    // listen on port config.port
    serverInstance = server.listen(CONFIG.PORT || 3000, async () => {
      console.log(`Server started listening on port ${CONFIG.PORT}`);
    });
    initSocket(serverInstance);
  })
  .catch((error) => {
    console.log(`Error occured`, error);
  });

const exitHandler = () => {
  if (serverInstance) {
    serverInstance.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});

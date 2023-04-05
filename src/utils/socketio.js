import { Server } from "socket.io";
import socketService from "../services/userSocket";

// class Socket {
//   constructor(server) {
//     this.io = new Server(server, {
//       cors: {
//         origin: '*',
//       },
//     });

//     this.io.on('connection', socket => {
//       // Welcome user
//       socket.emit('message', 'welcome to  The Recruits Group');

//       // listen when user calls connected function to store user and socket information
//       socket.on('connected', async userId => {
//         await socketService.createSocketConnection(socket.id, userId);
//       });

//       // Runs when clients disconnect
//       socket.on('disconnect', async () => {
//         await socketService.deleteSocketConnection(socket.id);
//         this.io.emit('message', 'A user has left the chat');
//       });
//     });
//   }
// }

let socket;
export function initSocket(server) {
  if (!socket) {
    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });
    io.on("connection", (socket) => {
      // Welcome user
      socket.emit("message", "welcome to  The Recruits Group");

      socket.on("jobNotification", async (jobInfo) => {
        let notifyUserIds = await socketService.getUsersToNotify(jobInfo);
        await socketService.createSocketConnection(socket.id, notifyUserIds);
      });

      // listen when user calls connected function to store user and socket information
      socket.on("sendNotification", async (userId) => {
        await socketService.createSocketConnection(socket.id, [userId]);
      });

      // Runs when clients disconnect
      // socket.on("disconnect", async () => {
      //   await socketService.deleteSocketConnection(socket.id);
      //   io.emit("message", "A user has left the chat");
      // });
    });
  }
}

export function getSocketIO() {
  if (!socket) {
    throw new Error("Please call init first");
  }
  return socket.io;
}

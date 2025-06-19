/**
 *
 * Date created : 29/06/2024
 *
 * Author : Nothile Moyo
 *
 * description : Our socket connection in a file which can be shared amongst multiple files
 */

import { Server } from "socket.io";
import { IncomingMessage, Server as HTTPServer, ServerResponse } from "http";
import dotenv from "dotenv";

dotenv.config();

let io: Server;

export const init = (
  server: HTTPServer<typeof IncomingMessage, typeof ServerResponse>,
) => {
  const socketUrl =
    process.env.NODE_ENV.trim() === "development"
      ? process.env.SOCKET_DEV_URL
      : process.env.SOCKET_PROD_URL;

  console.log("Current environment");
  console.log(process.env.NODE_ENV);
  console.log("Checking the socket url");
  console.log(socketUrl);

  io = new Server(server, {
    cors: {
      credentials: true,
      origin: socketUrl,
    },
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    console.error("Socket.io is not initialized!");
  } else {
    return io;
  }
};

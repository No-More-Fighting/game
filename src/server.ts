import { Server } from "socket.io";
import { createServer } from "http";
import express, { static } from "express";
import { Socket } from "./Socket";
//#region initialization
const app = express();
const http = createServer(app);
const io = new Server(http)
app.use(static("../client"))
//#endregion

io.on("connection", sock => {
    new Socket(sock, io).init();
});

http.listen(+(process.env.PORT || 3000));
